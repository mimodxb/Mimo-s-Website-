
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Star, Zap, Crown, Medal } from 'lucide-react';
import { getLinkById } from '@/lib/officialLinks';

/* 
  AWARDS DATA CONFIGURATION
  Mapped to official links where possible.
*/
const awardsData = [
  {
    id: 1,
    name: "FIPRESCI Prize",
    year: "2019",
    category: "International Critics Prize",
    status: "Winner",
    festival: "Cannes Film Festival", // Note: FIPRESCI often associated with Cannes/Rotterdam
    project: "End of Season",
    icon: Trophy,
    linkId: 13 // Example: Festival award link
  },
  {
    id: 2,
    name: "Best Actor",
    year: "2020",
    category: "Lead Performance",
    status: "Winner",
    festival: "Berlin Int. Film Festival",
    project: "The Silent Echo",
    icon: Crown,
    linkId: 15 // Example
  },
  {
    id: 3,
    name: "Golden Lion",
    year: "2021",
    category: "Best Film",
    status: "Nominee",
    festival: "Venice Film Festival",
    project: "Torn",
    icon: Star,
    linkId: 19 // Venice PDF
  },
  {
    id: 4,
    name: "Outstanding Performance",
    year: "2022",
    category: "Cast Ensemble",
    status: "Nominee",
    festival: "SAG Awards",
    project: "Shanghai, Baku",
    icon: Medal,
    linkId: 16 // Asian Academy (Simulated)
  },
  {
    id: 5,
    name: "Best Int. Feature",
    year: "2023",
    category: "Foreign Language Film",
    status: "Shortlist",
    festival: "Academy Awards",
    project: "The Crossing",
    icon: Award,
    linkId: 17 // Cannes Selection (Simulated)
  },
  {
    id: 6,
    name: "Rising Star",
    year: "2024",
    category: "Achievement in Film",
    status: "Honoree",
    festival: "BAFTA",
    project: "Career Achievement",
    icon: Zap,
    linkId: 13 // Dubai (Simulated)
  }
];

const PressLogos = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20
      }
    }
  };

  return (
    <section className="relative py-24 px-8 bg-[#0A1612] overflow-hidden border-t border-[#E0A995]/10">
      {/* Ambient Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#E0A995]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#E0A995]/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#EBE8E3] mb-3">
              Awards & Recognition
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#E0A995] to-transparent mx-auto opacity-60" />
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#A8B3AF] text-lg max-w-2xl mx-auto font-light leading-relaxed"
          >
            A legacy of excellence acknowledged by the world's most prestigious cinema institutions.
          </motion.p>
        </div>

        {/* Awards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {awardsData.map((award) => {
            const Icon = award.icon;
            const officialLink = getLinkById(award.linkId);
            const href = officialLink ? officialLink.url : "#";

            return (
              <motion.a
                key={award.id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                variants={cardVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group relative bg-[#EBE8E3] rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-[#E0A995]/20 flex flex-col h-full cursor-pointer"
              >
                {/* Decorative Accent Bar */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#E0A995] via-[#D49A89] to-[#E0A995] opacity-80" />
                
                {/* Subtle Gradient Overlay on Card */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />

                {/* Card Content */}
                <div className="relative flex flex-col h-full justify-between gap-6 z-10">
                  
                  {/* Header: Year & Icon */}
                  <div className="flex justify-between items-start">
                    <span className="inline-block px-3 py-1 bg-[#0A1612]/5 rounded-full text-sm font-mono font-medium text-[#0A1612]/60 border border-[#0A1612]/10 group-hover:bg-[#E0A995] group-hover:text-[#0A1612] group-hover:border-[#E0A995] transition-colors duration-300">
                      {award.year}
                    </span>
                    <div className="p-3 bg-white rounded-full text-[#0A1612] shadow-sm group-hover:bg-[#0A1612] group-hover:text-[#E0A995] transition-all duration-300 ring-1 ring-[#0A1612]/5">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Body: Festival & Award Name */}
                  <div className="space-y-3">
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-[#0A1612] leading-tight group-hover:text-[#8B5E3C] transition-colors duration-300">
                      {award.festival}
                    </h3>
                    <div className="flex flex-col gap-0.5">
                       <span className="text-[#0A1612]/80 font-bold text-sm uppercase tracking-wide">
                        {award.name}
                       </span>
                       <span className="text-[#0A1612]/60 text-sm italic font-medium">
                        {award.project}
                       </span>
                    </div>
                  </div>

                  {/* Footer: Details & Status */}
                  <div className="pt-5 border-t border-[#0A1612]/10 flex items-center justify-between mt-auto">
                    <span className="text-sm font-medium text-[#0A1612]/70">
                      {award.category}
                    </span>
                    <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md transition-colors duration-300 ${
                      award.status === 'Winner' 
                        ? 'bg-[#E0A995]/30 text-[#6D4228] border border-[#E0A995]/20' 
                        : 'bg-[#0A1612]/5 text-[#0A1612]/50 border border-[#0A1612]/5'
                    }`}>
                      {award.status}
                    </span>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default PressLogos;
