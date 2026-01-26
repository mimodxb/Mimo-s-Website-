
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, RotateCcw } from 'lucide-react';

const years = [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019];
const keyYears = [2011, 2014, 2016, 2019]; // Years with releases

const TimelineSlider = ({ minYear, maxYear, onChange }) => {
  const [range, setRange] = useState([minYear, maxYear]);

  useEffect(() => {
    setRange([minYear, maxYear]);
  }, [minYear, maxYear]);

  const handleYearClick = (year) => {
    // Simple logic: expand range to include clicked year, or set single year if outside?
    // Let's make it toggle-like or range setting.
    // For this UI, clicking a year sets it as the start or end depending on proximity.
    
    let [start, end] = range;
    if (year < start) start = year;
    else if (year > end) end = year;
    else {
        // Inside range: shrink to clicked year? Or maybe nearest boundary?
        const distToStart = Math.abs(year - start);
        const distToEnd = Math.abs(year - end);
        if (distToStart < distToEnd) start = year;
        else end = year;
    }
    const newRange = [start, end];
    setRange(newRange);
    onChange(newRange);
  };

  const resetRange = () => {
    const fullRange = [2011, 2019];
    setRange(fullRange);
    onChange(fullRange);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 select-none">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[#E0A995] font-serif text-lg flex items-center gap-2">
          <Calendar className="w-4 h-4" /> 
          Timeline: <span className="text-[#EBE8E3]">{range[0]} — {range[1]}</span>
        </h3>
        <button 
          onClick={resetRange}
          className="text-xs flex items-center gap-1 text-[#A8B3AF] hover:text-[#E0A995] transition-colors uppercase tracking-wider"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Desktop Visual Timeline */}
      <div className="relative h-12 flex items-center">
        {/* Track Line */}
        <div className="absolute left-0 right-0 h-1 bg-[#13251E] rounded-full overflow-hidden">
             {/* Active Range Bar */}
             <motion.div 
               className="absolute top-0 bottom-0 bg-[#E0A995]"
               initial={false}
               animate={{
                 left: `${((range[0] - 2011) / (2019 - 2011)) * 100}%`,
                 right: `${100 - ((range[1] - 2011) / (2019 - 2011)) * 100}%`
               }}
               transition={{ type: "spring", stiffness: 300, damping: 30 }}
             />
        </div>

        {/* Year Points */}
        <div className="relative w-full flex justify-between">
          {years.map((year) => {
            const isKey = keyYears.includes(year);
            const isActive = year >= range[0] && year <= range[1];
            
            return (
              <div 
                key={year} 
                className="relative group cursor-pointer"
                onClick={() => handleYearClick(year)}
              >
                <motion.div
                  className={`
                    w-3 h-3 rounded-full border-2 transition-colors duration-300 z-10 relative
                    ${isActive ? 'bg-[#E0A995] border-[#E0A995]' : 'bg-[#0A1612] border-[#13251E] group-hover:border-[#E0A995]/50'}
                    ${isKey ? 'scale-125' : 'scale-90'}
                  `}
                  whileHover={{ scale: 1.5 }}
                  whileTap={{ scale: 0.9 }}
                />
                
                {/* Year Label */}
                <div className={`
                    absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium transition-colors duration-300
                    ${isActive ? 'text-[#EBE8E3]' : 'text-[#A8B3AF]/50'}
                    ${isKey ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                `}>
                  {year}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimelineSlider;
