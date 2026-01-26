
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CategoryFilter from './CategoryFilter';
import LinkCard from './LinkCard';
import { OFFICIAL_LINKS } from '@/lib/officialLinks';

// Provided images as reference URLs for backgrounds/thumbnails if needed
const imageReferences = [
  "https://horizons-cdn.hostinger.com/c7dad59a-68cf-4683-81b9-922e45c5685c/853fc28573e4da8a7ff43bc921ea03a5.jpg",
  "https://horizons-cdn.hostinger.com/c7dad59a-68cf-4683-81b9-922e45c5685c/45250580ee60e4250f934ae12af47f3e.jpg",
  "https://horizons-cdn.hostinger.com/c7dad59a-68cf-4683-81b9-922e45c5685c/921a69417537f803757afbb01817727c.jpg",
  "https://horizons-cdn.hostinger.com/c7dad59a-68cf-4683-81b9-922e45c5685c/1066ab0a39ed1700c7dc1a6bd3f5bb0b.jpg",
  "https://horizons-cdn.hostinger.com/c7dad59a-68cf-4683-81b9-922e45c5685c/487bdc9459bb61413e136228e2a9bf73.jpg",
  "https://horizons-cdn.hostinger.com/c7dad59a-68cf-4683-81b9-922e45c5685c/c3f452ea9f67b7093a603249689808b0.jpg",
  "https://horizons-cdn.hostinger.com/c7dad59a-68cf-4683-81b9-922e45c5685c/2feb3e211e078cae712681b8162cfbfd.jpg",
  "https://horizons-cdn.hostinger.com/c7dad59a-68cf-4683-81b9-922e45c5685c/488dc2b64078869dd87370ddf07acf5f.jpg",
  "https://horizons-cdn.hostinger.com/c7dad59a-68cf-4683-81b9-922e45c5685c/9585a6cc04cbb290fa04c939c0ffed8e.jpg",
  "https://horizons-cdn.hostinger.com/c7dad59a-68cf-4683-81b9-922e45c5685c/142e8bacabb767465cdde1182b673da3.jpg"
];

const NEW_CATEGORIES = [
  "All",
  "Interviews",
  "Reviews & Critical Reception",
  "Festival Pages & Awards",
  "Festival Program PDFs & Catalogs",
  "Trailers & Clips",
  "Press Kits & Press Releases",
  "Bios & Databases"
];

const CuratedLinksSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredLinks = activeCategory === "All"
    ? OFFICIAL_LINKS
    : OFFICIAL_LINKS.filter(link => link.category === activeCategory);

  return (
    <section className="py-24 px-8 relative z-10 bg-gradient-to-b from-[#0A1612] to-[#13251E]/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#EBE8E3] mb-6">
            Curated <span className="text-[#E0A995]">Links</span>
          </h2>
          <p className="text-[#A8B3AF] max-w-2xl mx-auto text-lg">
            Explore a comprehensive collection of press, achievements, and resources.
          </p>
        </motion.div>

        <CategoryFilter
          categories={NEW_CATEGORIES}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredLinks.map((link, index) => (
              <LinkCard key={link.id} link={link} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredLinks.length === 0 && (
           <div className="text-center text-[#A8B3AF] py-12">
             No links found for this category.
           </div>
        )}
      </div>
    </section>
  );
};

export default CuratedLinksSection;
