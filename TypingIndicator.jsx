
import React from 'react';
import { motion } from 'framer-motion';

const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-1 p-2 bg-[#13251E] rounded-lg w-fit">
      {[0, 1, 2].map((dot) => (
        <motion.div
          key={dot}
          className="w-1.5 h-1.5 bg-[#A8B3AF] rounded-full"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: dot * 0.2 }}
        />
      ))}
    </div>
  );
};

export default TypingIndicator;
