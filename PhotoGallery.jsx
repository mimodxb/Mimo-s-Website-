
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import PhotoCard from '@/components/PhotoCard';
import PhotoLightbox from '@/components/PhotoLightbox';

const PHOTOS_DATA = [
  // Headshots
  {
    id: 1,
    title: "Portrait Studio",
    src: "https://horizons-cdn.hostinger.com/c7dad59a-68cf-4683-81b9-922e45c5685c/889b2b1c846d9d2905264cd4bf7d46ee.jpg",
    category: "Headshots",
    alt: "Professional Headshot"
  },
  
  // Events
  {
    id: 2,
    title: "Red Carpet Gala",
    src: "https://horizons-cdn.hostinger.com/c7dad59a-68cf-4683-81b9-922e45c5685c/8bb9911a4e3d3f306477cb387432b67d.jpg",
    category: "Events",
    alt: "Red Carpet Appearance"
  },
  {
    id: 3,
    title: "Film Premiere Interview",
    src: "https://horizons-cdn.hostinger.com/c7dad59a-68cf-4683-81b9-922e45c5685c/586e07e22ce152ea4a92f6b2eeba10e1.jpg",
    category: "Events",
    alt: "Interview Moment"
  },

  // Casual
  {
    id: 4,
    title: "Beach Day with Friends",
    src: "https://horizons-cdn.hostinger.com/c7dad59a-68cf-4683-81b9-922e45c5685c/eec7967f0b69d1a2828b0959667f76e9.jpg",
    category: "Casual",
    alt: "Beach Group Photo"
  },
  {
    id: 5,
    title: "Coastal Leisure",
    src: "https://horizons-cdn.hostinger.com/c7dad59a-68cf-4683-81b9-922e45c5685c/630a7d5f7ee6f9a94824451d13b8274e.jpg",
    category: "Casual",
    alt: "Relaxing at the Beach"
  },
  {
    id: 6,
    title: "Seaside Moments",
    src: "https://horizons-cdn.hostinger.com/c7dad59a-68cf-4683-81b9-922e45c5685c/0380b537d867db2fb5e623a07d8cb7e4.jpg",
    category: "Casual",
    alt: "Candid Beach Moment"
  },
  {
    id: 7,
    title: "Summer Vibes",
    src: "https://horizons-cdn.hostinger.com/c7dad59a-68cf-4683-81b9-922e45c5685c/1378d76df158946ad22a0e99ed8cb543.jpg",
    category: "Casual",
    alt: "Summer Group Photo"
  },
  {
    id: 8,
    title: "Ocean Splash",
    src: "https://horizons-cdn.hostinger.com/c7dad59a-68cf-4683-81b9-922e45c5685c/e3b37fe34b02dba5b17457db590a7d35.jpg",
    category: "Casual",
    alt: "Playing in the Waves"
  },
  {
    id: 9,
    title: "Shoreline Fun",
    src: "https://horizons-cdn.hostinger.com/c7dad59a-68cf-4683-81b9-922e45c5685c/ef111a4cd9f51182a706472e94f43df1.jpg",
    category: "Casual",
    alt: "Beach Fun"
  }
];

const CATEGORIES = ["All", "Headshots", "Events", "Casual"];

const PhotoGallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  const filteredPhotos = activeCategory === "All" 
    ? PHOTOS_DATA 
    : PHOTOS_DATA.filter(photo => photo.category === activeCategory);

  const handlePhotoClick = (photo) => {
    // Find the index in the *filtered* list for navigation context
    const index = filteredPhotos.findIndex(p => p.id === photo.id);
    setSelectedPhotoIndex(index);
  };

  const handleNext = () => {
    setSelectedPhotoIndex((prev) => (prev + 1) % filteredPhotos.length);
  };

  const handlePrev = () => {
    setSelectedPhotoIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  return (
    <div className="w-full">
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {CATEGORIES.map((category) => (
          <Button
            key={category}
            onClick={() => setActiveCategory(category)}
            variant={activeCategory === category ? "default" : "outline"}
            className={`
              rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 border
              ${activeCategory === category
                ? "bg-[#E0A995] text-[#0A1612] border-[#E0A995] shadow-[0_0_15px_rgba(224,169,149,0.3)]"
                : "bg-transparent text-[#A8B3AF] border-[#E0A995]/20 hover:text-[#E0A995] hover:border-[#E0A995] hover:bg-[#E0A995]/5"}
            `}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Grid Layout */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredPhotos.map((photo) => (
            <PhotoCard 
              key={photo.id} 
              photo={photo} 
              onClick={handlePhotoClick} 
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <PhotoLightbox 
        isOpen={selectedPhotoIndex !== null}
        photo={filteredPhotos[selectedPhotoIndex]}
        currentIndex={selectedPhotoIndex}
        total={filteredPhotos.length}
        onClose={() => setSelectedPhotoIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
};

export default PhotoGallery;
