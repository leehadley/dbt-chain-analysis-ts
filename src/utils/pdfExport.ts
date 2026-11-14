import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
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

  // Desktop: use html2canvas + jsPDF
  const filename = `${(chain.title || 'dbt-chain').toLowerCase().replace(/[^a-z0-9]/g, '-')}.pdf`;

  try {
    // Temporarily add print class to apply print styles
    element.classList.add('print');

    // Capture the element as canvas with light background
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      allowTaint: true
    });

    // Remove print class
    element.classList.remove('print');

    // Create PDF with A4 dimensions
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const imgWidth = pageWidth - (margin * 2);
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = margin;

    // Add image to PDF, split across pages if needed
    const imgData = canvas.toDataURL('image/jpeg', 0.98);
    pdf.addImage(imgData, 'JPEG', margin, position, imgWidth, imgHeight);
    heightLeft -= (pageHeight - (margin * 2));

    while (heightLeft > 0) {
      position = heightLeft - imgHeight + margin;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', margin, position, imgWidth, imgHeight);
      heightLeft -= (pageHeight - (margin * 2));
    }

    pdf.save(filename);
  } catch (error) {
    console.error('PDF generation error:', error);
    alert('PDF download failed.\n\nAlternative: Use Print (Ctrl+P) and select "Save as PDF".');
  }
};



