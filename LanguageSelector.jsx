import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const languages = [
  { code: 'EN', name: 'English', flag: '🇬🇧' },
  { code: 'AZ', name: 'Azerbaijani', flag: '🇦🇿' },
  { code: 'RU', name: 'Russian', flag: '🇷🇺' },
  { code: 'AR', name: 'Arabic', flag: '🇸🇦' }
];

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (lang) => {
    setSelectedLang(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative z-50">
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleDropdown}
        className="flex items-center gap-2 text-[#A8B3AF] hover:text-[#E0A995] transition-colors font-medium border border-transparent hover:border-[#E0A995]/20 rounded-full px-3"
      >
        <span className="text-lg leading-none">{selectedLang.flag}</span>
        <span className="hidden sm:inline-block">{selectedLang.code}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-[#0A1612]/95 backdrop-blur-xl border border-[#E0A995]/20 rounded-xl shadow-2xl overflow-hidden py-2"
          >
            {languages.map((lang) => (
              <motion.button
                key={lang.code}
                whileHover={{ backgroundColor: 'rgba(224, 169, 149, 0.1)', x: 4 }}
                onClick={() => handleSelect(lang)}
                className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 transition-colors ${
                  selectedLang.code === lang.code ? 'text-[#E0A995]' : 'text-[#EBE8E3]'
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
                {selectedLang.code === lang.code && (
                  <motion.div layoutId="activeLang" className="ml-auto w-1.5 h-1.5 rounded-full bg-[#E0A995]" />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;