import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const { cartCount, toggleCart } = useCart();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Menu className="icon icon-menu" size={24} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          <div className="nav-links">
            <Link to="/">Home</Link>
            <a href="/#collections">Collections</a>
          </div>
        </div>

        <div className="navbar-logo">
          <Link to="/">AURELIA</Link>
        </div>

        <div className="navbar-right">
          <Link to={user ? (user.isAdmin ? '/admin' : '/') : '/login'} className="cart-icon-wrapper" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            <User className="icon" size={20} />
            {user && <span style={{ marginLeft: '5px', fontSize: '12px' }}>{user.name}</span>}
          </Link>
          <div className="cart-icon-wrapper" onClick={toggleCart}>
            <ShoppingBag className="icon" size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <a href="/#collections" onClick={() => setIsMobileMenuOpen(false)}>Collections</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
