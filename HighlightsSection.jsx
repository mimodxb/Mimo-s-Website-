
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Film, Award, Briefcase, Radio } from 'lucide-react';

const highlights = [
  {
    icon: Film,
    title: 'Acting',
    description: 'Film and screen performances recognized for psychological depth, restraint, and narrative authenticity, with a focus on independent and international cinema.',
    path: '/media?tab=filmography'
  },
  {
    icon: Award,
    title: 'Awards',
    description: 'Recipient of international film awards and critical recognition at major festivals, including FIPRESCI honors for feature film work.',
    path: '/media?tab=press-kit'
  },
  {
    icon: Briefcase,
    title: 'Creative Direction',
    description: "Founder and creative lead of Mimo's Collective, an interdisciplinary platform supporting artists, filmmakers, and creative technologists through strategic storytelling and digital production.",
    path: '/media?tab=press-kit'
  },
  {
    icon: Radio,
    title: 'Media & Presence',
    description: 'Work and projects featured across international media, festival publications, and digital platforms focused on contemporary cinema and creative innovation.',
    path: '/media?tab=press-kit'
  }
];

const HighlightsSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-24 px-8 bg-[#0F1C15]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[#EBE8E3] mb-4">
            Highlights
          </h2>
          <p className="text-lg text-[#A8B3AF]">Excellence across multiple domains</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => navigate(highlight.path)}
              className="group relative cursor-pointer"
            >
              <div className="relative p-8 glass-card rounded-lg h-full transition-transform duration-300 group-hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-[#E0A995]/0 to-[#E0A995]/0 group-hover:from-[#E0A995]/5 group-hover:to-transparent rounded-lg transition-all duration-300" />
                
                <div className="relative space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#13251E] border border-[#E0A995]/30 flex items-center justify-center group-hover:border-[#E0A995] transition-all duration-300 shadow-lg shadow-black/20 group-hover:shadow-[#E0A995]/20">
                    <highlight.icon className="w-8 h-8 text-[#E0A995]" />
                  </div>
                  
                  <h3 className="text-2xl font-serif font-bold text-[#EBE8E3] group-hover:text-[#E0A995] transition-colors duration-300">
                    {highlight.title}
                  </h3>
                  
                  <p className="text-[#A8B3AF] leading-relaxed group-hover:text-[#EBE8E3] transition-colors duration-300">
                    {highlight.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
