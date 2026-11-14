import type { jsPDF } from 'jspdf';
import { ChainAnalysis } from '../constants/dbtSkills';

type RGB = [number, number, number];

const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN = 15;
const CONTENT_W = PAGE_W - MARGIN * 2;
const PT_TO_MM = 0.3528;

const COLORS = {
  text: [30, 41, 59] as RGB,
  muted: [100, 116, 139] as RGB,
  rule: [203, 213, 225] as RGB,
  indigo: [67, 56, 202] as RGB,
  red: [220, 38, 38] as RGB,
  amber: [180, 83, 9] as RGB,
  yellow: [161, 98, 7] as RGB,
  purple: [126, 34, 206] as RGB,
  emerald: [4, 120, 87] as RGB,
  rose: [190, 18, 60] as RGB,
  pink: [157, 23, 77] as RGB,
};

// jsPDF's built-in fonts only cover WinAnsi, so emoji and other symbols would print as garbage.
const toPdfText = (value: string) =>
  value
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[^\x09\x0A\x20-\x7E\xA0-\xFF–—•…]/gu, '')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();

// iPadOS Safari reports a desktop (Macintosh) user agent, so also treat touch-capable Macs as mobile.
const isMobile = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
  (/Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints > 1);

export const buildPdf = async (chain: ChainAnalysis): Promise<jsPDF> => {
  const { jsPDF: JsPDF } = await import('jspdf');
  const doc = new JsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  let y = MARGIN;

  const ensureSpace = (height: number) => {
    if (y + height > PAGE_H - MARGIN) {
      doc.addPage();
      y = MARGIN;
    }
  };

  const write = (
    text: string,
    opts: { size?: number; bold?: boolean; italic?: boolean; color?: RGB; indent?: number; gap?: number } = {}
  ) => {
    const { size = 10, bold = false, italic = false, color = COLORS.text, indent = 0, gap = 1.5 } = opts;
    doc.setFont('helvetica', bold ? (italic ? 'bolditalic' : 'bold') : italic ? 'italic' : 'normal');
    doc.setFontSize(size);
    doc.setTextColor(...color);
    const lineHeight = size * PT_TO_MM * 1.4;
    const lines: string[] = doc.splitTextToSize(toPdfText(text), CONTENT_W - indent);
    for (const line of lines) {
      ensureSpace(lineHeight);
      doc.text(line, MARGIN + indent, y + size * PT_TO_MM);
      y += lineHeight;
    }
    y += gap;
  };

  const heading = (title: string, color: RGB) => {
    ensureSpace(14);
    y += 3;
    write(title, { size: 12, bold: true, color, gap: 0.5 });
    doc.setDrawColor(...COLORS.rule);
    doc.setLineWidth(0.3);
    doc.line(MARGIN, y, PAGE_W - MARGIN, y);
    y += 3;
  };

  const labelled = (label: string, value: string, color: RGB) => {
    write(label, { size: 10, bold: true, color, gap: 0.5 });
    write(value || 'None specified', { indent: 3, color: value ? COLORS.text : COLORS.muted, italic: !value });
  };

  // Header
  write('DBT BEHAVIORAL CHAIN ANALYSIS', { size: 9, bold: true, color: COLORS.indigo, gap: 1 });
  write(chain.title || 'Untitled Chain Analysis', { size: 20, bold: true, gap: 1 });
  write(`${chain.date || 'No date'}   ${chain.time || ''}`, { size: 9, color: COLORS.muted, gap: 2 });
  doc.setDrawColor(...COLORS.rule);
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  y += 2;

  // 1. Target behavior
  const tb = chain.targetBehavior;
  heading(`1. Target Behavior  (Severity ${tb.intensity}/10)`, COLORS.red);
  write(tb.description || 'Not specified', { bold: !!tb.description, color: tb.description ? COLORS.text : COLORS.muted });
  if (tb.category) write(`Category: ${tb.category}`, { size: 9, color: COLORS.muted });
  if (tb.location || tb.context) {
    write(`Location: ${tb.location || 'N/A'}  |  Setting/Context: ${tb.context || 'N/A'}`, { size: 9, color: COLORS.muted });
  }

  // 2. Vulnerabilities
  heading('2. Vulnerability Factors', COLORS.amber);
  if (chain.vulnerabilities.length) {
    chain.vulnerabilities.forEach(v => write(`• ${v.text} (${v.category})`, { indent: 2, gap: 0.8 }));
  } else {
    write('None specified', { italic: true, color: COLORS.muted });
  }

  // 3. Prompting event
  heading('3. Prompting Event (Trigger)', COLORS.yellow);
  write(chain.promptingEvent.text || 'Not specified', { color: chain.promptingEvent.text ? COLORS.text : COLORS.muted });
  const meta = [
    chain.promptingEvent.type && `Type: ${chain.promptingEvent.type}`,
    chain.promptingEvent.time && `Time: ${chain.promptingEvent.time}`,
  ].filter(Boolean).join('  |  ');
  if (meta) write(meta, { size: 9, color: COLORS.muted });

  // 4 & 6. Links and skills
  heading('4 & 6. Sequence of Links & DBT Skill Circuit Breakers', COLORS.indigo);
  if (!chain.links.length) write('No links recorded', { italic: true, color: COLORS.muted });
  chain.links.forEach((link, idx) => {
    ensureSpace(16);
    write(`Link #${idx + 1}  [${link.type}]   Intensity: ${link.intensity}/10`, { bold: true, gap: 0.5 });
    write(link.text, { indent: 3 });
    chain.skills
      .filter(s => s.linkId === link.id)
      .forEach(s => {
        write(`Coping skill: ${s.customSkillName}${s.note ? ` - "${s.note}"` : ''}`, {
          size: 9, bold: true, color: COLORS.emerald, indent: 3, gap: 1,
        });
      });
    y += 1.5;
  });

  // 5. Consequences
  heading('5. Consequences', COLORS.purple);
  labelled('Short-term Immediate:', chain.consequences.shortTerm, COLORS.emerald);
  labelled('Long-term Impact:', chain.consequences.longTerm, COLORS.rose);

  // 7. Prevention & repair
  heading('7. Prevention & Harm Repair Plan', COLORS.pink);
  labelled('Vulnerability Prevention Plan:', chain.preventionPlan, COLORS.pink);
  labelled('Harm Repair & Amends:', chain.repairPlan, COLORS.pink);

  if (chain.therapistNotes) {
    heading('Notes', COLORS.muted);
    write(chain.therapistNotes, { italic: true });
  }

  // Page numbers
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.muted);
    doc.text(`Page ${i} of ${pages}`, PAGE_W / 2, PAGE_H - 8, { align: 'center' });
  }

  return doc;
};

// Result of an export. `manual` means the browser wouldn't let us save/share the file from code,
// so the caller must show `url` as a link the user taps (a real tap works in every mobile browser).
export type PdfResult = { status: 'done' } | { status: 'manual'; url: string; filename: string };

// Warm the lazy jsPDF chunk so the tap handler never awaits a network import before share()/download.
export const preloadPdfLib = () => {
  void import('jspdf');
};

const deliver = async (blob: Blob, filename: string): Promise<PdfResult> => {
  // Mobile: programmatic downloads are unreliable (iOS ignores them), so share the file or hand back a link.
  if (isMobile()) {
    if (typeof navigator.canShare === 'function' && typeof navigator.share === 'function') {
      const file = new File([blob], filename, { type: 'application/pdf' });
      if (navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: filename });
          return { status: 'done' };
        } catch (error) {
          if ((error as DOMException).name === 'AbortError') return { status: 'done' }; // user dismissed the sheet
          console.warn('Share failed, offering manual link:', error);
        }
      }
    }
    return { status: 'manual', url: URL.createObjectURL(blob), filename };
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
  return { status: 'done' };
};

export const generatePDF = async (chain: ChainAnalysis): Promise<PdfResult> => {
  const filename = `${(chain.title || 'dbt-chain').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'dbt-chain'}.pdf`;
  try {
    const doc = await buildPdf(chain);
    return await deliver(doc.output('blob'), filename);
  } catch (error) {
    console.error('PDF generation error:', error);
    alert('PDF export failed.\n\nAlternative: use the Print button and choose "Save as PDF".');
    return { status: 'done' };
  }
};
