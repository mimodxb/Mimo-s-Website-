
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Linkedin, Instagram, Twitter, Github, 
  FileText, Video, Search, Hash, AtSign, Clapperboard
} from 'lucide-react';
import { getLinkById } from '@/lib/officialLinks';

// Helper to get official URL if available, else generic
const getUrl = (id, fallback) => {
  const link = getLinkById(id);
  return link ? link.url : fallback;
};

const SOCIAL_LINKS = [
  {
    id: 'imdb',
    platform: 'IMDb Pro',
    url: getUrl(35, 'https://pro.imdb.com/name/nm4666352/'),
    icon: Search, // Using Search as generic icon for IMDb or custom if available
    color: '#E2B616',
    gradient: 'from-[#E2B616]/20 to-[#F5DE50]/20'
  },
  {
    id: 'spotlight',
    platform: 'Spotlight',
    url: getUrl(36, 'https://www.spotlight.com/profile/'),
    icon: Clapperboard,
    color: '#003399',
    gradient: 'from-[#003399]/20 to-[#0055CC]/20'
  },
  {
    id: 'linkedin',
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/movsum-mirzazada/',
    icon: Linkedin,
    color: '#0077B5',
    gradient: 'from-[#0077B5]/20 to-[#00A0DC]/20'
  },
  {
    id: 'instagram',
    platform: 'Instagram',
    url: 'https://www.instagram.com/movsum_mirzazada/',
    icon: Instagram,
    color: '#E1306C',
    gradient: 'from-[#833AB4]/20 to-[#E1306C]/20'
  },
  {
    id: 'twitter',
    platform: 'X / Twitter',
    url: 'https://x.com/mimo_mirzazada',
    icon: Twitter,
    color: '#000000',
    gradient: 'from-gray-700/20 to-black/20'
  },
  {
    id: 'backstage',
    platform: 'Backstage',
    url: getUrl(38, 'https://www.backstage.com/u/movsum-mirzazada/'),
    icon: FileText,
    color: '#F40F35',
    gradient: 'from-[#F40F35]/20 to-[#FF4560]/20'
  },
  {
    id: 'etalenta',
    platform: 'e-Talenta',
    url: getUrl(37, 'https://www.e-talenta.eu/members/profile/movsum-mirzazada'),
    icon: Video,
    color: '#555555',
    gradient: 'from-[#555555]/20 to-[#777777]/20'
  },
  {
    id: 'castupload',
    platform: 'CastUpload',
    url: getUrl(39, 'https://www.castupload.com/actors/movsum-mirzazada'),
    icon: Hash,
    color: '#2A9D8F',
    gradient: 'from-[#2A9D8F]/20 to-[#48CAE4]/20'
  },
  {
    id: 'filmmakers',
    platform: 'Filmmakers.eu',
    url: getUrl(40, 'https://www.filmmakers.eu/en/actors/movsum-mirzazada'),
    icon: AtSign,
    color: '#1D3557',
    gradient: 'from-[#1D3557]/20 to-[#457B9D]/20'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const OfficialLinks = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6"
      >
        {SOCIAL_LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <motion.a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex items-center gap-4 p-6 rounded-xl border border-[#E0A995]/10 bg-[#13251E]/40 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-[#E0A995]/40 hover:shadow-lg hover:shadow-[#E0A995]/10"
            >
              {/* Hover Gradient Background */}
              <div 
                className={`absolute inset-0 bg-gradient-to-r ${link.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} 
              />
              
              {/* Icon Container */}
              <div className="relative z-10 p-3 bg-[#E0A995]/10 rounded-full border border-[#E0A995]/20 group-hover:scale-110 transition-transform duration-300">
                <Icon 
                  className="w-6 h-6 text-[#E0A995] group-hover:text-white transition-colors duration-300" 
                  style={{ color: link.color }}
                />
              </div>

              {/* Text Content */}
              <div className="relative z-10 flex-grow">
                <h3 className="text-lg font-serif font-bold text-[#EBE8E3] group-hover:text-white transition-colors">
                  {link.platform}
                </h3>
                <span className="text-xs text-[#A8B3AF] group-hover:text-[#E0A995] transition-colors flex items-center gap-1">
                  Visit Profile 
                  <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">→</span>
                </span>
              </div>
            </motion.a>
          );
        })}
      </motion.div>
    </div>
  );
};

export default OfficialLinks;
