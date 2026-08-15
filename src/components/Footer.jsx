import React from 'react';
import './Footer.css';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-col">
          <Link to="/" className="footer-logo">AURELIA</Link>
          <p className="footer-description">
            Discover the epitome of elegance. Aurelia offers meticulously crafted luxury jewelry designed to celebrate your most extraordinary moments.
          </p>
        </div>
        
        <div className="footer-col">
          <h3>Contact Us</h3>
          <div className="contact-item">
            <Mail size={16} />
            <span>support@aurelia.com</span>
          </div>
          <div className="contact-item">
            <Phone size={16} />
            <span>+1 (800) 123-4567</span>
          </div>
        </div>
        
        <div className="footer-col">
          <h3>Address</h3>
          <div className="contact-item">
            <MapPin size={16} />
            <span>123 Luxury Avenue,<br/>Suite 500,<br/>New York, NY 10001</span>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Aurelia Jewelry. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
