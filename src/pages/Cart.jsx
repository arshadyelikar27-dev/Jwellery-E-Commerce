import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import SwipeRevealImage from '../components/SwipeRevealImage';

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
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline"
          style={{
            marginBottom: '1.5rem',
            padding: '0.45rem 1rem',
            fontSize: '0.8rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            borderRadius: '6px'
          }}
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="glass-card" style={{ padding: '2rem', background: '#fff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
            <h1 style={{ fontSize: '1.8rem', margin: 0 }}>Your Shopping Bag</h1>
            <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
              {cartItems.length} {cartItems.length === 1 ? 'Creation' : 'Creations'}
            </span>
          </div>

          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#faf8f5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', border: '1px dashed var(--color-accent)' }}>
                <ShoppingBag size={40} color="#c5a97d" />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Your shopping bag is empty</h3>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', maxWidth: '360px', margin: '0 auto 2rem' }}>
                Discover our curated collection of timeless jewelry, rare diamonds, and fine gold.
              </p>
              <button className="btn btn-shimmer-gold" onClick={() => navigate('/')}>
                Discover Collections
              </button>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '90px 1fr auto',
                      gap: '1.5rem',
                      alignItems: 'center',
                      padding: '1.2rem 0',
                      borderBottom: '1px solid #f2eee8'
                    }}
                  >
                    <div style={{ width: '90px', height: '90px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                      <SwipeRevealImage
                        src={item.image}
                        alt={item.name}
                        aspectRatio="1/1"
                        curtainColor="gold"
                        duration={0.6}
                      />
                    </div>

                    <div>
                      <Link to={`/product/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.3rem' }}>{item.name}</h4>
                      </Link>
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                        Quantity: {item.quantity} • Unit Price: ₹{item.price.toLocaleString('en-IN')}
                      </p>
                      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.6rem' }}>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          style={{ fontSize: '0.78rem', color: '#c53030', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }}
                        >
                          <Trash2 size={13} /> Remove
                        </button>
                        <button
                          className="btn btn-outline"
                          style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', borderRadius: '4px' }}
                          onClick={() => navigate('/checkout', { state: { checkoutItems: [item] } })}
                        >
                          Checkout Item
                        </button>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--color-obsidian)' }}>
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                      <span style={{ fontSize: '0.72rem', color: '#8c734b' }}>Insured Delivery</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total & Checkout Bar */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '2.5rem',
                  paddingTop: '1.5rem',
                  borderTop: '2px solid var(--color-border)',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Total Bag Value
                  </span>
                  <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--color-obsidian)' }}>
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </div>
                </div>

                <button
                  className="btn btn-shimmer-gold"
                  style={{ padding: '1rem 2.5rem', borderRadius: '8px', fontSize: '0.9rem' }}
                  onClick={() => navigate('/checkout')}
                >
                  <span>Proceed to Delivery & Checkout</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;
