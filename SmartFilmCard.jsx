import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Eye, Film, Calendar, Clock, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SmartFilmCard = ({ film, onViewDetails }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -10, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onViewDetails(film)}
      className="group relative w-full aspect-[2/3] md:aspect-[3/4] rounded-xl overflow-hidden cursor-pointer bg-[#13251E] border border-[#E0A995]/10 hover:border-[#E0A995]/30 hover:shadow-[0_0_30px_rgba(224,169,149,0.15)] transition-all duration-500"
    >
      {/* Skeleton Loading State */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-[#13251E] animate-pulse z-0 flex items-center justify-center">
          <Film className="w-12 h-12 text-[#E0A995]/20" />
        </div>
      )}

      {/* Main Image */}
      <img
        src={film.image}
        alt={film.title}
        onLoad={() => setImageLoaded(true)}
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out",
          isHovered ? "scale-110 blur-[2px]" : "scale-100",
          !imageLoaded && "opacity-0"
        )}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1612] via-[#0A1612]/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

      {/* Award Badge - Pulsing */}
      {film.hasAwards && (
        <div className="absolute top-4 right-4 z-20">
          <motion.div
            animate={{ boxShadow: ["0 0 0px rgba(224,169,149,0)", "0 0 15px rgba(224,169,149,0.4)", "0 0 0px rgba(224,169,149,0)"] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#E0A995] text-[#0A1612] shadow-lg"
          >
            <Award className="w-5 h-5" />
          </motion.div>
        </div>
      )}

      {/* Format Badge */}
      <div className="absolute top-4 left-4 z-20">
        <span className="px-2 py-1 bg-[#0A1612]/60 backdrop-blur-md border border-[#E0A995]/30 rounded text-[10px] font-bold uppercase tracking-widest text-[#E0A995]">
          {film.format}
        </span>
      </div>

      {/* Content Container */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
        {/* Main Info (Always Visible) */}
        <motion.div
          animate={{ y: isHovered ? -20 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="flex items-center gap-2 mb-2 text-[#E0A995] text-xs font-bold tracking-widest uppercase">
            <Calendar className="w-3 h-3" />
            <span>{film.year}</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#EBE8E3] leading-none mb-1 group-hover:text-[#E0A995] transition-colors">
            {film.title}
          </h3>
          {film.titleAlt && (
            <p className="text-sm text-[#A8B3AF] italic opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
              {film.titleAlt}
            </p>
          )}
        </motion.div>

        {/* Mini Preview (Visible on Hover) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-2 border-t border-[#E0A995]/20 space-y-2">
                <div className="flex items-center justify-between text-xs text-[#A8B3AF]">
                  <span className="flex items-center gap-1"><Film className="w-3 h-3 text-[#E0A995]" /> {film.role}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#E0A995]" /> {film.runtime || 'N/A'}</span>
                </div>
                <div className="text-xs text-[#A8B3AF]">
                  <span className="text-[#E0A995]">Dir.</span> {film.director}
                </div>
                
                <div className="pt-3">
                   <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E0A995] hover:text-white transition-colors">
                     View Details <ArrowUpRight className="w-3 h-3" />
                   </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SmartFilmCard;