
import React from 'react';
import { motion } from 'framer-motion';
import { ZoomIn } from 'lucide-react';

const PhotoCard = ({ photo, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.05, y: -5, zIndex: 10 }}
      transition={{ duration: 0.3 }}
      className="relative group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl bg-[#13251E] cursor-pointer aspect-[3/4] border border-[#E0A995]/10 hover:border-[#E0A995]/40"
      onClick={() => onClick(photo)}
    >
      <img
        src={photo.src}
        alt={photo.alt || photo.title}
        className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-110 group-hover:scale-105"
        loading="lazy"
      />
      
      {/* Category Badge - Top Left */}
      <div className="absolute top-4 left-4 z-20 overflow-hidden">
        <motion.div 
            initial={{ y: -40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }} 
            className="bg-[#E0A995] text-[#0A1612] text-xs font-bold px-3 py-1 rounded-full shadow-lg"
        >
          {photo.category}
        </motion.div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center backdrop-blur-[2px]">
        <ZoomIn className="text-[#E0A995] w-10 h-10 mb-2 drop-shadow-md transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-75" />
        <h3 className="text-[#EBE8E3] font-serif text-lg font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
          {photo.title}
        </h3>
      </div>
    </motion.div>
  );
};

export default PhotoCard;
