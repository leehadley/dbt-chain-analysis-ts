import html2pdf from 'html2pdf.js';
import { ChainAnalysis } from '../constants/dbtSkills';

const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const generatePDF = async (chain: ChainAnalysis, elementId: string) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Element not found for PDF export');
    alert('Could not find report to export. Please refresh and try again.');
    return;
  }

  // On mobile, show instructions only
  if (isMobile()) {
    alert(
      '📱 Mobile PDF Export:\n\n' +
      'Step 1: Tap the Print button below\n' +
      'Step 2: Look for "Save as PDF" or "PDF" option\n' +
      'Step 3: Choose download location\n\n' +
      'Note: The exact steps vary by browser (Chrome, Safari, Firefox, etc.)'
    );
    return;
  }

  // Desktop: use html2pdf
  const opt = {
    margin: 10,
    filename: `${(chain.title || 'dbt-chain').toLowerCase().replace(/[^a-z0-9]/g, '-')}.pdf`,
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, logging: false },
    jsPDF: { orientation: 'portrait' as const, unit: 'mm' as const, format: 'a4' }
  };

  try {
    await html2pdf().set(opt).from(element).save();
  } catch (error) {
    console.error('PDF generation error:', error);
    alert('PDF download failed.\n\nAlternative: Use Print (Ctrl+P) and select "Save as PDF".');
  }
};



