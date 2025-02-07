import React, { useState } from 'react';
import { motion } from "framer-motion";

const FlipCard = ({ frontImage, backImage }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div 
      className="relative w-64 h-96 perspective"
      onClick={() => setIsFlipped(!isFlipped)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div 
        className="w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ 
          transformStyle: 'preserve-3d',
          position: 'relative'
        }}
      >
        {/* Front Side */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            backfaceVisibility: 'hidden',
            backgroundImage: `url(${frontImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }}
        >
          Front Side
        </motion.div>

        {/* Back Side */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            backfaceVisibility: 'hidden',
            backgroundImage: `url(${backImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white'
          }}
        >
          <img 
            src="/api/placeholder/240/160" 
            alt="Back side" 
            className="w-full h-full object-cover"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FlipCard;
