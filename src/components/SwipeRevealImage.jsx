import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './SwipeRevealImage.css';

/**
 * SwipeRevealImage - 21st.dev inspired luxury image component with sliding curtain swipe reveal,
 * scale zoom-out entrance, and interactive shimmer effect.
 */
const SwipeRevealImage = ({
  src,
  alt = '',
  className = '',
  aspectRatio = '1/1',
  curtainColor = 'gold', // 'gold' | 'dark' | 'champagne' | 'platinum'
  direction = 'left-to-right', // 'left-to-right' | 'right-to-left' | 'top-to-bottom'
  delay = 0.1,
  duration = 0.8,
  hoverZoom = true,
  onClick,
  style = {}
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const curtainVariants = {
    hidden: {
      x: direction === 'left-to-right' ? '0%' : direction === 'right-to-left' ? '0%' : '0%',
      y: direction === 'top-to-bottom' ? '0%' : '0%',
      scaleX: 1
    },
    visible: {
      x: direction === 'left-to-right' ? '102%' : direction === 'right-to-left' ? '-102%' : '0%',
      y: direction === 'top-to-bottom' ? '102%' : '0%',
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.77, 0, 0.175, 1] // Luxurious Expo Bezier
      }
    }
  };

  const imageVariants = {
    hidden: {
      scale: 1.15,
      opacity: 0,
      filter: 'blur(2px)'
    },
    visible: {
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: duration * 1.05,
        delay: delay + 0.12,
        ease: [0.25, 1, 0.5, 1]
      }
    }
  };

  return (
    <motion.div
      className={`swipe-reveal-container ${curtainColor}-curtain ${hoverZoom ? 'has-hover-zoom' : ''} ${className}`}
      style={{ aspectRatio, ...style }}
      onClick={onClick}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-20px' }}
    >
      {/* Sliding Luxury Main Curtain */}
      <motion.div
        className={`swipe-curtain ${curtainColor}`}
        variants={curtainVariants}
      >
        <div className="curtain-sheen" />
      </motion.div>

      {/* Secondary accent edge ribbon */}
      <motion.div
        className="swipe-curtain-accent"
        initial={{ x: '0%' }}
        whileInView={{ x: direction === 'left-to-right' ? '105%' : '-105%' }}
        viewport={{ once: true }}
        transition={{
          duration: duration * 0.75,
          delay: delay + 0.05,
          ease: [0.77, 0, 0.175, 1]
        }}
      />

      {/* Target Image */}
      <motion.img
        src={src}
        alt={alt}
        className="swipe-reveal-img"
        variants={imageVariants}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
      />

      {/* Subtle Ambient Hover Shine */}
      <div className="image-shine-overlay" />
    </motion.div>
  );
};

export default SwipeRevealImage;
