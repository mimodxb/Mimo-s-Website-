
import React from 'react';
import { Download, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SAMPLE_CASE_STRUCTURE } from '@/lib/sampleCaseStructure';
import { pdfService } from '@/lib/pdfService';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';

const SampleCaseStructure = () => {
  const navigate = useNavigate();

  const handleDownload = async () => {
    try {
      const blob = await pdfService.generateCasePDF("Sample Case Structure", SAMPLE_CASE_STRUCTURE);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "sample_case_structure.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (e) {
      console.error(e);
      alert("Could not generate sample PDF");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1612] py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
           <Button variant="ghost" onClick={() => navigate(-1)} className="text-[#A8B3AF] hover:text-[#E0A995]">
             <ArrowLeft className="w-4 h-4 mr-2" /> Back
           </Button>
           <h1 className="text-2xl font-serif font-bold text-[#E0A995]">Sample Output Preview</h1>
           <Button onClick={handleDownload} className="bg-[#E0A995] text-[#0A1612] hover:bg-[#D49A89]">
             <Download className="w-4 h-4 mr-2" /> Download Sample PDF
           </Button>
        </div>

        <div className="relative">
          {/* Disclaimer Banner */}
          <div className="absolute top-0 left-0 w-full bg-[#E0A995] text-[#0A1612] text-center py-2 font-bold uppercase tracking-widest text-xs z-10 opacity-90">
             SAMPLE DOCUMENT - FOR ILLUSTRATION ONLY
          </div>

          <div className="bg-white text-[#333] p-12 md:p-20 rounded-sm shadow-2xl min-h-[800px] mt-4 relative">
             <div 
               className="prose max-w-none font-serif"
               dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(SAMPLE_CASE_STRUCTURE) }} 
             />
             
             {/* Watermark */}
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
               <span className="text-[150px] font-bold -rotate-45 text-black">SAMPLE</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SampleCaseStructure;
