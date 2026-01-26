import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, DollarSign, Euro, PoundSterling } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCurrency } from '@/contexts/CurrencyContext';

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar', icon: DollarSign },
  { code: 'EUR', symbol: '€', name: 'Euro', icon: Euro },
  { code: 'GBP', symbol: '£', name: 'British Pound', icon: PoundSterling },
  { code: 'AZN', symbol: '₼', name: 'Azerbaijani Manat', icon: null } // Custom text icon for AZN if needed
];

const CurrencySelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currency, setCurrency } = useCurrency(); // Assuming context provides these

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (currCode) => {
    setCurrency(currCode);
    setIsOpen(false);
  };

  const selectedCurrency = currencies.find(c => c.code === currency) || currencies[0];

  return (
    <div className="relative z-50">
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleDropdown}
        className="flex items-center gap-2 text-[#A8B3AF] hover:text-[#E0A995] transition-colors font-medium border border-transparent hover:border-[#E0A995]/20 rounded-full px-3"
      >
        <span>{selectedCurrency.symbol}</span>
        <span className="hidden sm:inline-block">{selectedCurrency.code}</span>
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
            {currencies.map((curr) => (
              <motion.button
                key={curr.code}
                whileHover={{ backgroundColor: 'rgba(224, 169, 149, 0.1)', x: 4 }}
                onClick={() => handleSelect(curr.code)}
                className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 transition-colors ${
                  currency === curr.code ? 'text-[#E0A995]' : 'text-[#EBE8E3]'
                }`}
              >
                <span className="w-5 text-center font-bold">{curr.symbol}</span>
                <span className="font-medium">{curr.name}</span>
                {currency === curr.code && (
                  <motion.div layoutId="activeCurr" className="ml-auto w-1.5 h-1.5 rounded-full bg-[#E0A995]" />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CurrencySelector;