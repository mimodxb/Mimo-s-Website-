
import React from 'react';
import { motion } from 'framer-motion';
import { Download, Camera, FileText, Film, Award, MapPin, Share2, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getLinkById } from '@/lib/officialLinks';

const PressKitTab = () => {

  const handleDownload = (url) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const AssetCard = ({ icon: Icon, title, children, downloadUrl, buttonText = "Download Asset" }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card p-6 rounded-xl flex flex-col h-full bg-[#13251E]/40 backdrop-blur-sm border border-[#E0A995]/10 hover:border-[#E0A995]/30 hover:shadow-[0_0_20px_rgba(224,169,149,0.1)] transition-all duration-300 group"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-lg bg-[#E0A995]/10 border border-[#E0A995]/20 group-hover:bg-[#E0A995] group-hover:text-[#0A1612] transition-colors duration-300">
          <Icon className="w-5 h-5 text-[#E0A995] group-hover:text-[#0A1612]" />
        </div>
        <h3 className="font-serif font-bold text-lg text-[#EBE8E3]">{title}</h3>
      </div>
      
      <div className="flex-grow mb-6 text-sm text-[#A8B3AF] space-y-3">
        {children}
      </div>

      <Button
        variant="outline"
        onClick={() => handleDownload(downloadUrl)}
        className="w-full border-[#E0A995]/30 text-[#E0A995] hover:bg-[#E0A995] hover:text-[#0A1612] gap-2 mt-auto group/btn transition-all"
      >
        <Download className="w-4 h-4 group-hover/btn:translate-y-0.5 transition-transform" />
        {buttonText}
      </Button>
    </motion.div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-12">
      {/* Hero Section */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-serif font-bold text-[#EBE8E3] mb-4"
        >
          Press & Media Kit
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[#A8B3AF] text-lg"
        >
          Professional assets for journalists, casting directors, and media.
          Download high-resolution photos, biography, and filmography.
        </motion.p>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* 1. Headshots */}
        <AssetCard 
          icon={Camera} 
          title="Official Headshots" 
          downloadUrl={getLinkById(32)?.url} 
          buttonText="Download All Headshots"
        >
          <div className="grid grid-cols-3 gap-2 mb-2">
            {[
              "https://horizons-cdn.hostinger.com/c7dad59a-68cf-4683-81b9-922e45c5685c/img_4981-1-93NuX.JPG",
              "https://horizons-cdn.hostinger.com/c7dad59a-68cf-4683-81b9-922e45c5685c/efb230e1a107a472268f3cf0123251c6.jpg",
              "https://horizons-cdn.hostinger.com/c7dad59a-68cf-4683-81b9-922e45c5685c/5ce0430cbf207dae9fe868e336fd017d.jpg"
            ].map((src, i) => (
               <div key={i} className="aspect-square rounded-md overflow-hidden bg-[#0A1612]">
                 <img src={src} alt="Headshot preview" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
               </div>
            ))}
          </div>
          <p>3 High-Res Professional Portraits (JPG, 300dpi)</p>
        </AssetCard>

        {/* 2. Biography */}
        <AssetCard 
          icon={FileText} 
          title="Biography" 
          downloadUrl={getLinkById(31)?.url} 
          buttonText="Download Bio (PDF)"
        >
          <div className="p-3 bg-[#0A1612]/30 rounded border border-[#E0A995]/10 italic text-xs leading-relaxed mb-2">
            "Award-winning Azerbaijani actor based in Dubai. FIPRESCI Prize winner for 'End of Season' (2019)..."
          </div>
          <p>Full professional biography in English & Azerbaijani.</p>
        </AssetCard>

        {/* 3. Filmography */}
        <AssetCard 
          icon={Film} 
          title="Filmography" 
          downloadUrl={getLinkById(35)?.url} 
          buttonText="View on IMDb Pro"
        >
          <div className="space-y-1">
             <div className="flex justify-between text-xs font-bold text-[#EBE8E3] border-b border-[#E0A995]/10 pb-1">
                <span>6 Films</span>
                <span>2011-2019</span>
             </div>
             <ul className="text-xs space-y-1 text-[#A8B3AF]">
                <li>• End of Season (Feature)</li>
                <li>• Shanghai, Baku (Short)</li>
                <li>• Ali and Nino (Feature)</li>
             </ul>
          </div>
        </AssetCard>

        {/* 4. Awards */}
        <AssetCard 
          icon={Award} 
          title="Awards & Recognition" 
          downloadUrl={getLinkById(13)?.url} 
          buttonText="View Awards List"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl font-bold text-[#E0A995]">4</span>
            <span className="text-xs uppercase tracking-wide">Major Awards</span>
          </div>
          <ul className="text-xs space-y-1 list-disc list-inside">
            <li>FIPRESCI Prize (IFFR)</li>
            <li>Best Male Actor (Moscow Premiere)</li>
            <li>Cannes Directors' Fortnight Selection</li>
          </ul>
        </AssetCard>

        {/* 5. Contact Info */}
        <AssetCard 
          icon={MapPin} 
          title="Contact Information" 
          downloadUrl="/contact" 
          buttonText="Go to Contact Page"
        >
          <div className="space-y-2 text-xs">
            <div>
              <strong className="text-[#E0A995] block">Dubai Office (UAE)</strong>
              Paramount Tower, Business Bay
            </div>
            <div>
              <strong className="text-[#E0A995] block">Baku Office (AZE)</strong>
              Alibeyov Brothers Street 97
            </div>
            <div className="pt-2 border-t border-[#E0A995]/10">
              contact@movsummirzazada.com
            </div>
          </div>
        </AssetCard>

        {/* 6. Social Media Kit */}
        <AssetCard 
          icon={Share2} 
          title="Social Media Kit" 
          downloadUrl={getLinkById(33)?.url} 
          buttonText="Download Social Assets"
        >
          <div className="grid grid-cols-2 gap-2 text-xs mb-2">
             <div className="bg-[#0A1612]/40 p-2 rounded">
                <span className="block font-bold text-[#EBE8E3]">IG</span> @movsum_mirzazada
             </div>
             <div className="bg-[#0A1612]/40 p-2 rounded">
                <span className="block font-bold text-[#EBE8E3]">YT</span> @movsummirzazada
             </div>
             <div className="bg-[#0A1612]/40 p-2 rounded">
                <span className="block font-bold text-[#EBE8E3]">IN</span> LinkedIn Profile
             </div>
             <div className="bg-[#0A1612]/40 p-2 rounded">
                <span className="block font-bold text-[#EBE8E3]">Web</span> mimoscollective.com
             </div>
          </div>
        </AssetCard>

      </div>

      {/* Master Download CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 flex justify-center"
      >
        <Button
          onClick={() => handleDownload(getLinkById(30)?.url)}
          className="bg-[#E0A995] hover:bg-[#D49A89] text-[#0A1612] h-auto py-6 px-12 rounded-full text-lg font-bold shadow-[0_0_40px_rgba(224,169,149,0.3)] hover:shadow-[0_0_60px_rgba(224,169,149,0.5)] transition-all duration-300 group"
        >
          <FileCheck className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
          <div className="text-left">
            <div className="leading-none">DOWNLOAD COMPLETE PRESS KIT</div>
            <div className="text-[10px] font-normal opacity-70 mt-1 uppercase tracking-wider">~25 MB • ZIP Archive</div>
          </div>
        </Button>
      </motion.div>
    </div>
  );
};

export default PressKitTab;
