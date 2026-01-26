
import React from 'react';
import { motion } from 'framer-motion';

const GradientBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-[#0A1612]">
      {/* Base dark forest layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1612] via-[#0F221C] to-[#0A1612] opacity-90" />
      
      {/* Morphing Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 45, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-[#13251E] blur-[100px] opacity-30"
      />
      
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, 50, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[40%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-[#1D362C] blur-[120px] opacity-20"
      />

      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-[20%] left-[20%] w-[80vw] h-[80vw] rounded-full bg-[#0F1C15] blur-[100px] opacity-40"
      />
    </div>
  );
};

export default GradientBackground;
