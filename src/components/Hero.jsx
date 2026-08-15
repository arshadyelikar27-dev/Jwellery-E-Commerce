import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Hero.css';

const Hero = () => {
  const contentRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    gsap.fromTo(
      el.children,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  return (
    <section className="hero">
      <div className="hero-background">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          src="/Jwellery Vid.mp4" 
        />
      </div>
      <div className="hero-content" ref={contentRef}>
        <h1>Elegance Redefined</h1>
        <p>Discover our new collection of timeless pieces.</p>
      </div>
    </section>
  );
};

export default Hero;
