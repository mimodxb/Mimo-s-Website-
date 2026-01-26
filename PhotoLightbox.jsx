
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PhotoLightbox = ({ 
  photo, 
  isOpen, 
  onClose, 
  onNext, 
  onPrev, 
  currentIndex, 
  total 
}) => {
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener("keydown", handleKeyDown);
    }
    
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, onNext, onPrev]);

  return (
    <AnimatePresence>
      {isOpen && photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-[#0A1612]/95 backdrop-blur-xl flex items-center justify-center"
          onClick={onClose}
        >
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-6 right-6 text-white/50 hover:text-[#E0A995] hover:bg-white/10 rounded-full z-50 transition-colors"
            onClick={onClose}
          >
            <X className="w-8 h-8" />
          </Button>

          {/* Navigation - Left */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 md:left-8 text-white/50 hover:text-[#E0A995] hover:bg-white/10 rounded-full w-12 h-12 z-50 hidden md:flex transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>

          {/* Main Content */}
          <div 
            className="relative w-full h-full max-w-7xl flex flex-col items-center justify-center p-4 md:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-full max-h-[80vh] shadow-2xl"
            >
              <img
                src={photo.src}
                alt={photo.alt || photo.title}
                className="max-w-full max-h-[80vh] object-contain rounded-md shadow-2xl border border-[#E0A995]/10"
              />
            </motion.div>

            {/* Caption & Counter */}
            <div className="mt-6 text-center">
              <h3 className="text-[#EBE8E3] font-serif text-xl md:text-2xl font-medium mb-1">
                {photo.title}
              </h3>
              <div className="flex items-center justify-center gap-2 text-[#A8B3AF] text-sm font-medium tracking-wider uppercase">
                <span className="text-[#E0A995]">{photo.category}</span>
                <span>•</span>
                <span>{currentIndex + 1} of {total}</span>
              </div>
            </div>
          </div>

          {/* Navigation - Right */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 md:right-8 text-white/50 hover:text-[#E0A995] hover:bg-white/10 rounded-full w-12 h-12 z-50 hidden md:flex transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
          >
            <ChevronRight className="w-8 h-8" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PhotoLightbox;
