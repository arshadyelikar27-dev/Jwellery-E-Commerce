import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, User, X, Shield, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const { cartCount, toggleCart } = useCart();
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Left Navigation */}
          <div className="navbar-left">
            <button
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <nav className="desktop-nav">
              <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                Home
              </Link>
              <a href="/#collections" className="nav-link">
                Collection
              </a>
              <a href="/#footer" className="nav-link">
                Contact
              </a>
            </nav>
          </div>

          {/* Center Brand Identity */}
          <div className="navbar-brand">
            <Link to="/" className="brand-link">
              <span className="brand-name">SAFA</span>
            </Link>
          </div>

          {/* Right Action Utilities */}
          <div className="navbar-right">
            {user?.isAdmin && (
              <Link to="/admin" className="admin-badge-link" title="Admin Control Room">
                <Shield size={14} />
                <span className="admin-label">Admin</span>
              </Link>
            )}

            <Link
              to={user ? (user.isAdmin ? '/admin' : '/cart') : '/login'}
              className="user-nav-btn"
              title={user ? `Signed in as ${user.name}` : 'Sign In'}
            >
              <User size={19} className="nav-icon" />
              {user && <span className="user-firstname">{user.name.split(' ')[0]}</span>}
            </Link>

            <motion.button
              className="cart-nav-btn"
              onClick={toggleCart}
              whileTap={{ scale: 0.92 }}
              aria-label="View shopping bag"
            >
              <ShoppingBag size={20} className="nav-icon" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    className="cart-count-pill"
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="mobile-nav-drawer"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mobile-nav-inner">
                <Link to="/" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)}>
                  <span>Home</span>
                  <ArrowRight size={16} />
                </Link>
                <a href="/#collections" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)}>
                  <span>Collection</span>
                  <ArrowRight size={16} />
                </a>
                <a href="/#footer" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)}>
                  <span>Contact</span>
                  <ArrowRight size={16} />
                </a>
                {user ? (
                  <Link
                    to={user.isAdmin ? '/admin' : '/cart'}
                    className="mobile-nav-item mobile-user-row"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>{user.isAdmin ? 'Admin Dashboard' : `Signed in as ${user.name}`}</span>
                    <ArrowRight size={16} />
                  </Link>
                ) : (
                  <Link to="/login" className="mobile-nav-item mobile-user-row" onClick={() => setIsMobileMenuOpen(false)}>
                    <span>Sign In to Account</span>
                    <ArrowRight size={16} />
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;
