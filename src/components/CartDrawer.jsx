import React, { useEffect, useState } from 'react';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SwipeRevealImage from './SwipeRevealImage';
import './CartDrawer.css';

const CartDrawer = () => {
  const { isCartOpen, toggleCart, closeCart, cartItems, removeFromCart, cartTotal } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'SAFA10' || couponCode.toUpperCase() === 'LUXURY') {
      setCouponApplied(true);
      if (addToast) addToast('VIP Privilege promo code applied successfully!');
    } else {
      if (addToast) addToast('Invalid promo code. Try "SAFA10"', 'error');
    }
  };

  const discountAmount = couponApplied ? Math.round(cartTotal * 0.1) : 0;
  const finalSubtotal = cartTotal - discountAmount;

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            className="cart-drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart || toggleCart}
          />
        )}
      </AnimatePresence>

      <div className={`luxury-cart-drawer ${isCartOpen ? 'open' : ''}`}>
        {/* Drawer Header */}
        <div className="cart-header">
          <div className="header-title-group">
            <h2>Your Shopping Bag</h2>
            <span className="cart-item-count">
              ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} {cartItems.length === 1 ? 'item' : 'items'})
            </span>
          </div>
          <button className="cart-close-icon" onClick={closeCart || toggleCart} aria-label="Close Shopping Bag">
            <X size={20} />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div className="empty-cart-state">
              <div className="empty-icon-circle">
                <ShoppingBag size={36} color="#c5a97d" />
              </div>
              <h3>Your bag is currently empty</h3>
              <p>Explore our latest creations of certified diamonds and heirloom gold.</p>
              <button
                className="btn btn-shimmer-gold mt-4"
                onClick={() => {
                  if (closeCart) closeCart();
                  else toggleCart();
                  navigate('/');
                }}
              >
                Discover High Jewelry
              </button>
            </div>
          ) : (
            <div className="cart-items-wrapper">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    className="cart-item-card"
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <div className="item-thumbnail">
                      <SwipeRevealImage
                        src={item.image}
                        alt={item.name}
                        aspectRatio="1/1"
                        curtainColor="gold"
                        duration={0.5}
                      />
                    </div>

                    <div className="item-details">
                      <div className="item-title-row">
                        <h4 className="item-title">{item.name}</h4>
                        <button
                          className="item-remove-link"
                          onClick={() => removeFromCart(item.id)}
                          title="Remove item"
                        >
                          <X size={14} />
                        </button>
                      </div>

                      <p className="item-unit-price">₹{item.price.toLocaleString('en-IN')}</p>

                      <div className="item-bottom-actions">
                        <div className="qty-pill">
                          <span className="qty-text">Qty: {item.quantity}</span>
                        </div>

                        <button
                          className="item-direct-buy-btn"
                          onClick={() => {
                            if (closeCart) closeCart();
                            else toggleCart();
                            navigate('/checkout', { state: { checkoutItems: [item] } });
                          }}
                        >
                          Checkout Item <ArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            {/* Promo Code Toggle */}
            <form onSubmit={handleApplyCoupon} className="coupon-form">
              <input
                type="text"
                placeholder="VIP Promo Code (e.g. SAFA10)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="coupon-input"
              />
              <button type="submit" className="coupon-btn">
                Apply
              </button>
            </form>

            <div className="price-summary-box">
              {couponApplied && (
                <div className="summary-line discount-line">
                  <span>Privilege VIP Discount (10%):</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="summary-line total-line">
                <span>Estimated Subtotal</span>
                <span className="subtotal-val">₹{finalSubtotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              className="btn btn-shimmer-gold drawer-checkout-btn"
              onClick={() => {
                if (closeCart) closeCart();
                else toggleCart();
                navigate('/checkout');
              }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
