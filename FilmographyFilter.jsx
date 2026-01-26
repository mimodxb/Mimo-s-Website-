
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

const FilmographyFilter = ({ 
  selectedYear, 
  onYearChange, 
  showFeaturesOnly, 
  onFeaturesChange, 
  showAwardsOnly, 
  onAwardsChange 
}) => {
  const years = ['All', '2019', '2016', '2015', '2014', '2011'];

  return (
    <div className="flex flex-col items-center gap-6 mb-12">
      {/* Year Selection */}
      <div className="flex flex-wrap justify-center gap-2">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => onYearChange(year)}
            className={cn(
              "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border flex items-center gap-2",
              selectedYear === year
                ? "bg-[#E0A995] text-[#0A1612] border-[#E0A995] shadow-lg shadow-[#E0A995]/20"
                : "bg-transparent text-[#A8B3AF] border-[#E0A995]/20 hover:border-[#E0A995] hover:text-[#E0A995]"
            )}
          >
            {year !== 'All' && <Calendar className="w-3 h-3" />}
            {year === 'All' ? 'All Years' : year}
          </button>
        ))}
      </div>

      {/* Toggles */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => onFeaturesChange(!showFeaturesOnly)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm border transition-all duration-300",
            showFeaturesOnly
              ? "bg-[#13251E] border-[#E0A995] text-[#E0A995]"
              : "bg-transparent border-[#E0A995]/10 text-[#A8B3AF] hover:border-[#E0A995]/40"
          )}
        >
          <div className={cn(
            "w-4 h-4 rounded border flex items-center justify-center transition-colors",
            showFeaturesOnly ? "bg-[#E0A995] border-[#E0A995]" : "border-[#A8B3AF]"
          )}>
            {showFeaturesOnly && <Check className="w-3 h-3 text-[#0A1612]" />}
          </div>
          Feature Films Only
        </button>

        <button
          onClick={() => onAwardsChange(!showAwardsOnly)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm border transition-all duration-300",
            showAwardsOnly
              ? "bg-[#13251E] border-[#E0A995] text-[#E0A995]"
              : "bg-transparent border-[#E0A995]/10 text-[#A8B3AF] hover:border-[#E0A995]/40"
          )}
        >
          <div className={cn(
            "w-4 h-4 rounded border flex items-center justify-center transition-colors",
            showAwardsOnly ? "bg-[#E0A995] border-[#E0A995]" : "border-[#A8B3AF]"
          )}>
            {showAwardsOnly && <Check className="w-3 h-3 text-[#0A1612]" />}
          </div>
          Award Winning Only
        </button>
      </div>
    </div>
  );
};

export default FilmographyFilter;
