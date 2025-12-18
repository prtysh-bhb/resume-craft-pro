import { useCallback, useState } from 'react';
import html2pdf from 'html2pdf.js';

interface UsePdfDownloadReturn {
  downloadPdf: (elementId: string, fileName: string) => Promise<void>;
  isGenerating: boolean;
}

export const usePdfDownload = (): UsePdfDownloadReturn => {
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadPdf = useCallback(async (elementId: string, fileName: string) => {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error('Element not found:', elementId);
      return;
    }

    setIsGenerating(true);

    const options = {
      margin: 0.5,
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        letterRendering: true,
      },
      jsPDF: { 
        unit: 'in', 
        format: 'letter', 
        orientation: 'portrait' as const,
      },
    };

    try {
      await html2pdf().set(options).from(element).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return { downloadPdf, isGenerating };
};
