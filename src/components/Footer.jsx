import React from 'react';
import { Mail, Phone, MapPin, Globe, Share2, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-luxury" id="footer">
      <div className="container footer-main-content">
        <div className="footer-columns-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo">
              <span className="logo-brand">AURELIA</span>
            </Link>
            <p className="footer-about-text">
              Embodying the zenith of Parisian fine jewelry. Each Aurelia creation is a certified masterpiece, harmonizing rare ethically-sourced diamonds with timeless artisanal precious metals.
            </p>
            <div className="footer-social-icons">
              <a href="#global" className="social-icon-btn" aria-label="Global Boutiques" title="Global Boutiques">
                <Globe size={18} />
              </a>
              <a href="#atelier" className="social-icon-btn" aria-label="Atelier Heritage" title="Atelier Heritage">
                <Compass size={18} />
              </a>
              <a href="#share" className="social-icon-btn" aria-label="Share Collection" title="Share Collection">
                <Share2 size={18} />
              </a>
            </div>
          </div>

          {/* Contact & Atelier */}
          <div className="footer-contact-col">
            <h4 style={{ marginTop: '15px' }}>Contact</h4>
            <div className="contact-entry">
              <MapPin size={16} className="contact-icon" />
              <span>Place Vendôme, 75001 Paris, France • Flagship Lounge</span>
            </div>
            <div className="contact-entry">
              <Mail size={16} className="contact-icon" />
              <span>concierge@aurelia-paris.com</span>
            </div>
            <div className="contact-entry">
              <Phone size={16} className="contact-icon" />
              <span>+1 (800) 987-AURELIA (24/7 VIP Concierge)</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom-bar">
          <p>&copy; {new Date().getFullYear()} AURELIA S.A. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#privacy">Privacy Policy</a>
            <span>•</span>
            <a href="#terms">Terms of Service</a>
            <span>•</span>
            <a href="#ethics">Ethical Sourcing Statement</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
