import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="hero-luxury-section" id="hero">
      <div className="hero-video-container">
        <video
          autoPlay
          loop
          muted
          playsInline
          src="/Jwellery Vid.mp4"
          className="hero-video-element"
        />
        <div className="hero-video-scrim" />
        <div className="hero-ambient-glow" />
      </div>

      <div className="container hero-container-layout">
        <motion.div
          className="hero-text-block"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >

          <motion.h1 variants={itemVariants} className="hero-main-title">
            Elegance <span className="text-gradient-gold text-serif-italic">Redefined.</span>
            <br />
            Crafted for <span className="glow-text">Eternity.</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="hero-lead-description">
            Immerse yourself in exceptional craftsmanship, certified rare diamonds, and architectural 18k gold creations designed to celebrate life's most unforgettable milestones.
          </motion.p>

          <motion.div variants={itemVariants} className="hero-cta-actions">
            <a href="#collections" className="btn btn-shimmer-gold hero-explore-btn">
              <span>Explore Collection</span>
              <ArrowDown size={16} className="bounce-arrow" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
