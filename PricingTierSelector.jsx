
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PricingTierSelector = ({ selectedTier, onSelect, showUrgentOption }) => {
  const tiers = [
    {
      id: 'starter',
      name: 'Starter',
      price: 60,
      delivery: '3-5 Days',
      features: ['Basic complaint structure', 'Single revision', 'Standard formatting', 'Email support'],
      color: 'border-white/10'
    },
    {
      id: 'standard',
      name: 'Standard',
      price: 150,
      delivery: '5-7 Days',
      features: ['Detailed case analysis', '3 revisions', 'Professional legal formatting', 'Evidence attachment structuring', 'Priority email support'],
      color: 'border-[#E0A995]/50',
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 320,
      delivery: '1-3 Days',
      features: ['Comprehensive strategy', 'Unlimited revisions', 'Executive summary', 'Expedited delivery included', 'Direct consultation (30 min)'],
      color: 'border-[#D4AF37]/50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {tiers.map((tier) => (
        <motion.div
          key={tier.id}
          whileHover={{ scale: 1.02 }}
          className={`relative rounded-xl bg-[#13251E] border ${selectedTier === tier.id ? 'border-[#E0A995] ring-2 ring-[#E0A995]/20' : tier.color} p-6 flex flex-col shadow-lg transition-all cursor-pointer`}
          onClick={() => onSelect(tier.id)}
        >
          {tier.popular && (
            <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
              <span className="bg-[#E0A995] text-[#0A1612] text-xs font-bold px-3 py-1 rounded-full uppercase">Most Popular</span>
            </div>
          )}
          
          <h3 className="text-xl font-serif font-bold text-[#EBE8E3]">{tier.name}</h3>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-3xl font-bold text-[#E0A995]">${tier.price}</span>
            <span className="text-sm text-[#A8B3AF]">/ case</span>
          </div>
          
          <div className="mt-4 mb-6 flex items-center text-sm text-[#A8B3AF] gap-2">
            <Clock className="w-4 h-4 text-[#E0A995]" />
            {tier.delivery}
          </div>

          <ul className="space-y-3 mb-8 flex-1">
            {tier.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-[#EBE8E3]">
                <Check className="w-4 h-4 text-[#E0A995] shrink-0 mt-0.5" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-auto">
             <Button 
               variant={selectedTier === tier.id ? "default" : "outline"}
               className={`w-full ${selectedTier === tier.id ? 'bg-[#E0A995] text-[#0A1612]' : 'border-[#E0A995]/30 text-[#EBE8E3]'}`}
             >
               {selectedTier === tier.id ? 'Selected' : 'Select Tier'}
             </Button>
             
             {showUrgentOption && tier.id !== 'premium' && (
               <div className="mt-3 text-xs text-center text-[#A8B3AF] flex items-center justify-center gap-1">
                 <Zap className="w-3 h-3 text-yellow-500" />
                 Urgent delivery available (+$50)
               </div>
             )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PricingTierSelector;
