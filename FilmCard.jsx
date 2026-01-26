import React from 'react';
import { motion } from 'framer-motion';
import { Film, Calendar, Award, User } from 'lucide-react';

const FilmCard = ({ film, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className="group relative bg-[#13251E]/40 backdrop-blur-sm border border-[#E0A995]/20 rounded-xl overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-[#E0A995]/10 hover:-translate-y-2 transition-all duration-300"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img 
          src={film.image} 
          alt={film.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1612] via-[#0A1612]/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
        
        {film.hasAwards && (
          <div className="absolute top-4 right-4 bg-[#E0A995] text-[#0A1612] p-2 rounded-full shadow-lg">
            <Award className="w-4 h-4" />
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0A1612] to-transparent">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-inter tracking-wider uppercase text-[#E0A995] bg-[#E0A995]/10 px-3 py-1 rounded-full border border-[#E0A995]/30 backdrop-blur-md">
              {film.format === 'feature' ? 'Feature Film' : 'Short Film'}
            </span>
            <span className="text-xs font-inter text-[#EBE8E3]/80 bg-black/40 px-2 py-1 rounded-full">{film.year}</span>
          </div>
          <h3 className="text-2xl font-serif font-bold text-[#EBE8E3] group-hover:text-[#E0A995] transition-colors drop-shadow-lg">
            {film.title}
          </h3>
        </div>
      </div>
      
      <div className="p-6 border-t border-[#E0A995]/10">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-[#A8B3AF]">
            <User className="w-4 h-4 text-[#E0A995]" />
            <span className="font-medium text-[#EBE8E3]">{film.role}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-[#A8B3AF]">
            <Film className="w-4 h-4 text-[#E0A995]" />
            <span>Dir. {film.director}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FilmCard;