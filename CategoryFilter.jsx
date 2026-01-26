
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const CategoryFilter = ({ categories, activeCategory, onSelect }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      <button
        onClick={() => onSelect('All')}
        className={cn(
          "relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
          activeCategory === 'All'
            ? "bg-[#E0A995] text-[#0A1612] border-[#E0A995] shadow-lg shadow-[#E0A995]/20"
            : "bg-transparent text-[#A8B3AF] border-[#E0A995]/20 hover:border-[#E0A995] hover:text-[#E0A995]"
        )}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={cn(
            "relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
            activeCategory === category
              ? "bg-[#E0A995] text-[#0A1612] border-[#E0A995] shadow-lg shadow-[#E0A995]/20"
              : "bg-transparent text-[#A8B3AF] border-[#E0A995]/20 hover:border-[#E0A995] hover:text-[#E0A995]"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
