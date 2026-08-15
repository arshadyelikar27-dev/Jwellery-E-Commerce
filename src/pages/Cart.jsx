import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Cart = () => {
  const { cartItems, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  return (
    <motion.div 
      className="container py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <button onClick={() => navigate(-1)} className="btn btn-outline" style={{ marginBottom: '1rem', padding: '0.4rem 1rem' }}>&larr; Back</button>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p style={{ marginTop: '2rem' }}>Your cart is empty. <Link to="/">Continue shopping</Link></p>
      ) : (
        <div style={{ marginTop: '2rem' }}>
          {cartItems.map(item => (
            <div key={item.id} className="cart-item-row">
              <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
              <div style={{ flex: 1, width: '100%' }}>
                <h4>{item.name}</h4>
                <p>Qty: {item.quantity}</p>
                <button onClick={() => removeFromCart(item.id)} className="btn" style={{ padding: '0.2rem 0.5rem', marginTop: '0.5rem' }}>Remove</button>
                <button className="btn btn-outline" style={{ padding: '0.2rem 0.5rem', marginTop: '0.5rem', marginLeft: '0.5rem' }} onClick={() => navigate('/checkout', { state: { checkoutItems: [item] } })}>Buy</button>
              </div>
              <div>${(item.price * item.quantity).toLocaleString()}</div>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
            <span>Total:</span>
            <span>${cartTotal.toLocaleString()}</span>
          </div>
          <button 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '2rem' }}
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default Cart;
