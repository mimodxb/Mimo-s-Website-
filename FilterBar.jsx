
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, Check, Award, Film, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const FilterBar = ({ onFilterChange, filmCount, totalCount }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    format: 'all', // all, feature, short
    awardsOnly: false,
    years: [],
    themes: []
  });
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  // Constants
  const themes = ["Drama", "Historical", "Coming-of-age", "International"];
  const years = [2011, 2014, 2015, 2016, 2019];

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({ ...activeFilters, search: searchQuery });
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, activeFilters, onFilterChange]);

  const handleFilterUpdate = (key, value) => {
    const newFilters = { ...activeFilters, [key]: value };
    setActiveFilters(newFilters);
    onFilterChange({ ...newFilters, search: searchQuery });
  };

  const toggleArrayFilter = (key, item) => {
    const current = activeFilters[key];
    const updated = current.includes(item)
      ? current.filter(i => i !== item)
      : [...current, item];
    handleFilterUpdate(key, updated);
  };

  const clearAll = () => {
    const resetState = {
      format: 'all',
      awardsOnly: false,
      years: [],
      themes: []
    };
    setActiveFilters(resetState);
    setSearchQuery('');
    onFilterChange({ ...resetState, search: '' });
  };

  const hasActiveFilters = 
    activeFilters.format !== 'all' || 
    activeFilters.awardsOnly || 
    activeFilters.years.length > 0 || 
    activeFilters.themes.length > 0 ||
    searchQuery.length > 0;

  return (
    <div className="w-full space-y-4 mb-8">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-[#13251E]/40 p-4 rounded-xl border border-[#E0A995]/10 backdrop-blur-md">
        
        {/* Search Input */}
        <div className="relative w-full md:w-64 lg:w-80 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8B3AF] group-focus-within:text-[#E0A995] transition-colors" />
          <input
            type="text"
            placeholder="Search films, roles, directors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0A1612]/50 border border-[#E0A995]/20 rounded-lg py-2 pl-10 pr-8 text-sm text-[#EBE8E3] focus:outline-none focus:border-[#E0A995] focus:ring-1 focus:ring-[#E0A995] transition-all placeholder:text-[#A8B3AF]/50"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A8B3AF] hover:text-[#E0A995]"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Desktop Quick Filters */}
        <div className="hidden md:flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 custom-scrollbar">
          <Button
            size="sm"
            onClick={() => handleFilterUpdate('format', 'all')}
            className={cn(
              "rounded-full text-xs font-medium transition-all border",
              activeFilters.format === 'all' 
                ? "bg-[#E0A995] text-[#0A1612] border-[#E0A995]" 
                : "bg-transparent text-[#A8B3AF] border-[#E0A995]/20 hover:border-[#E0A995]"
            )}
          >
            All Formats
          </Button>
          <Button
            size="sm"
            onClick={() => handleFilterUpdate('format', 'feature')}
            className={cn(
              "rounded-full text-xs font-medium transition-all border",
              activeFilters.format === 'feature' 
                ? "bg-[#E0A995] text-[#0A1612] border-[#E0A995]" 
                : "bg-transparent text-[#A8B3AF] border-[#E0A995]/20 hover:border-[#E0A995]"
            )}
          >
            Features
          </Button>
          <Button
            size="sm"
            onClick={() => handleFilterUpdate('awardsOnly', !activeFilters.awardsOnly)}
            className={cn(
              "rounded-full text-xs font-medium transition-all border gap-1.5",
              activeFilters.awardsOnly
                ? "bg-[#E0A995] text-[#0A1612] border-[#E0A995]" 
                : "bg-transparent text-[#A8B3AF] border-[#E0A995]/20 hover:border-[#E0A995]"
            )}
          >
            {activeFilters.awardsOnly && <Check className="w-3 h-3" />}
            <Award className="w-3 h-3" />
            Award Winners
          </Button>
          
          <div className="w-px h-6 bg-[#E0A995]/20 mx-2" />

          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
            className={cn(
               "gap-2 text-[#A8B3AF] hover:text-[#E0A995]",
               (activeFilters.years.length > 0 || activeFilters.themes.length > 0) && "text-[#E0A995]"
            )}
          >
            <SlidersHorizontal className="w-4 h-4" />
            More Filters
          </Button>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="md:hidden flex items-center gap-2 w-full justify-between">
           <span className="text-xs text-[#A8B3AF]">
             Showing {filmCount} of {totalCount}
           </span>
           <Button
             size="sm"
             variant="outline"
             onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
             className="border-[#E0A995]/20 text-[#E0A995]"
           >
             <Filter className="w-3 h-3 mr-2" /> Filters
           </Button>
        </div>
      </div>

      {/* Expanded Filter Menu */}
      <AnimatePresence>
        {isFilterMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-[#0A1612] border border-[#E0A995]/10 rounded-xl p-4 md:p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Year Filters */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#E0A995] mb-3">Release Year</h4>
                <div className="flex flex-wrap gap-2">
                  {years.map(year => (
                    <button
                      key={year}
                      onClick={() => toggleArrayFilter('years', year)}
                      className={cn(
                        "px-3 py-1 rounded text-xs transition-colors border",
                        activeFilters.years.includes(year)
                          ? "bg-[#E0A995]/20 border-[#E0A995] text-[#E0A995]"
                          : "bg-[#13251E] border-[#E0A995]/10 text-[#A8B3AF] hover:border-[#E0A995]/40"
                      )}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Filters */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#E0A995] mb-3">Themes & Genre</h4>
                <div className="flex flex-wrap gap-2">
                  {themes.map(theme => (
                    <button
                      key={theme}
                      onClick={() => toggleArrayFilter('themes', theme)}
                      className={cn(
                        "px-3 py-1 rounded text-xs transition-colors border",
                        activeFilters.themes.includes(theme)
                          ? "bg-[#E0A995]/20 border-[#E0A995] text-[#E0A995]"
                          : "bg-[#13251E] border-[#E0A995]/10 text-[#A8B3AF] hover:border-[#E0A995]/40"
                      )}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6 pt-4 border-t border-[#E0A995]/10">
              <button
                 onClick={clearAll}
                 className="text-xs text-[#A8B3AF] hover:text-[#E0A995] mr-4 underline decoration-[#E0A995]/30"
              >
                Clear all filters
              </button>
              <Button size="sm" onClick={() => setIsFilterMenuOpen(false)} className="bg-[#E0A995] text-[#0A1612] hover:bg-[#D49A89]">
                Show Results
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Count Bar */}
      <div className="flex items-center justify-between text-xs px-2">
        <span className="text-[#A8B3AF]">
          Showing <span className="text-[#E0A995] font-bold">{filmCount}</span> of {totalCount} films
        </span>
        {hasActiveFilters && (
          <button onClick={clearAll} className="flex items-center gap-1 text-[#E0A995] hover:text-white transition-colors">
            <X className="w-3 h-3" /> Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
