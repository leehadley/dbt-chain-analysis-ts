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

  // On mobile, use native print dialog which converts to PDF
  if (isMobile()) {
    try {
      window.print();
      alert('Use your device\'s Print menu → Save as PDF to download the report');
      return;
    } catch (error) {
      console.error('Print fallback failed:', error);
      alert('Unable to export PDF on mobile. Please use: Menu → Print → Save as PDF');
      return;
    }
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
    alert('PDF export failed. Try using Print (Ctrl+P) and select "Save as PDF" instead.');
  }
};

// Fallback: Use native print functionality
export const printReport = () => {
  window.print();
};


