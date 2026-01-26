
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Award, FileText, Video, Calendar, Newspaper } from 'lucide-react';

const getIcon = (category) => {
  switch (category) {
    case 'Festival Pages & Awards': return Award;
    case 'Interviews': return Video;
    case 'Reviews & Critical Reception': return FileText;
    case 'Festival Program PDFs & Catalogs': return Calendar;
    case 'Press Kits & Press Releases': return Newspaper;
    default: return ExternalLink;
  }
};

const LinkCard = ({ link, index }) => {
  const Icon = getIcon(link.category);

  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group block relative bg-[#13251E]/60 backdrop-blur-md border border-[#E0A995]/20 hover:border-[#E0A995] rounded-xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-[#E0A995]/10 hover:-translate-y-1"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-[#0A1612] rounded-full border border-[#E0A995]/30 group-hover:bg-[#E0A995] group-hover:text-[#0A1612] transition-colors duration-300">
          <Icon className="w-5 h-5 text-[#E0A995] group-hover:text-[#0A1612]" />
        </div>
        <ExternalLink className="w-4 h-4 text-[#A8B3AF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <h3 className="text-lg font-serif font-bold text-[#EBE8E3] mb-2 leading-tight group-hover:text-[#E0A995] transition-colors">
        {link.title}
      </h3>

      <div className="flex items-center justify-between text-sm text-[#A8B3AF] mt-4 border-t border-[#E0A995]/10 pt-4">
        <span className="font-medium text-[#E0A995]/80">{link.source}</span>
        <span className="opacity-60">{link.date}</span>
      </div>
    </motion.a>
  );
};

export default LinkCard;
