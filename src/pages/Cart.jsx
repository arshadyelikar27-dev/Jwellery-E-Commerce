import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { cartItems, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  return (
    <motion.div 
      className="container py-8"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <button 
          onClick={() => navigate(-1)} 
          className="btn btn-outline" 
          style={{ marginBottom: '1.2rem', padding: '0.45rem 0.9rem', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div style={{ background: '#fff', border: '1px solid var(--color-border)', borderRadius: '10px', padding: '1.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.8rem' }}>Your Shopping Bag</h2>
          
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <ShoppingBag size={48} style={{ opacity: 0.2, margin: '0 auto 1rem' }} />
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>Your cart is empty.</p>
              <button className="btn btn-primary" onClick={() => navigate('/')} style={{ borderRadius: '6px' }}>Continue Shopping</button>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {cartItems.map(item => (
                  <div key={item.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '0.8rem 0', borderBottom: '1px solid #f0f0f0' }}>
                    <img src={item.image} alt={item.name} style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #eee' }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: '600', marginBottom: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Qty: {item.quantity} × ${item.price.toLocaleString()}</p>
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.4rem' }}>
                        <button onClick={() => removeFromCart(item.id)} style={{ fontSize: '0.75rem', color: '#c53030', textDecoration: 'underline' }}>Remove</button>
                        <button className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '4px' }} onClick={() => navigate('/checkout', { state: { checkoutItems: [item] } })}>Buy Item</button>
                      </div>
                    </div>
                    <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>
                      ${(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '2px solid var(--color-border)', fontSize: '1.1rem', fontWeight: 'bold' }}>
                <span>Subtotal:</span>
                <span>${cartTotal.toLocaleString()}</span>
              </div>

              <button 
                className="btn btn-primary" 
                style={{ width: '100%', marginTop: '1.5rem', padding: '0.85rem', borderRadius: '6px', fontSize: '0.9rem' }}
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;
