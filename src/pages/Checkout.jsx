import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, CreditCard, Smartphone, Truck } from 'lucide-react';

const Checkout = () => {
  const { cartItems: contextCartItems, cartTotal: contextCartTotal, clearCart, removeFromCart } = useCart();
  const { addOrder } = useOrders();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({ name: '', street: '', city: '', zip: '' });
  
  // Determine items to checkout
  const specificItems = location.state?.checkoutItems;
  const itemsToCheckout = specificItems || contextCartItems;
  const totalToPay = specificItems ? specificItems.reduce((acc, item) => acc + (item.price * item.quantity), 0) : contextCartTotal;

  // For success screen
  const [deliveryDate, setDeliveryDate] = useState('');

  if (itemsToCheckout.length === 0) {
    return (
      <div className="container py-8" style={{ textAlign: 'center' }}>
        <h2>No items to checkout.</h2>
        <button onClick={() => navigate('/')} className="btn btn-primary" style={{ marginTop: '1rem', borderRadius: '6px' }}>Return to Shop</button>
      </div>
    );
  }

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    addOrder({
      user: user || { name: 'Guest', email: 'guest@example.com' },
      items: itemsToCheckout,
      total: totalToPay,
      address
    });
    
    if (specificItems) {
      specificItems.forEach(item => removeFromCart(item.id));
    } else {
      clearCart();
    }
    
    const date = new Date();
    date.setDate(date.getDate() + 7);
    setDeliveryDate(date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    
    setStep(3);
  };

  return (
    <motion.div 
      className="container py-8" 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>
        {step < 3 && (
          <button 
            onClick={() => step === 2 ? setStep(1) : navigate(-1)} 
            className="btn btn-outline" 
            style={{ marginBottom: '1.2rem', padding: '0.45rem 0.9rem', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <ArrowLeft size={16} /> Back
          </button>
        )}

        {step === 1 && (
          <div style={{ background: '#fff', border: '1px solid var(--color-border)', borderRadius: '10px', padding: '1.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '0.3rem' }}>1. Shipping Address</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Where should we deliver your order?</p>

            <form onSubmit={handleAddressSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: '500' }}>Full Name</label>
                <input 
                  placeholder="John Doe" 
                  required 
                  value={address.name} 
                  onChange={e => setAddress({...address, name: e.target.value})} 
                  style={{ width: '100%', padding: '0.75rem', marginTop: '0.35rem', border: '1px solid var(--color-border)', borderRadius: '6px', fontSize: '0.9rem' }} 
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: '500' }}>Street Address</label>
                <input 
                  placeholder="123 Luxury Ave, Apt 4B" 
                  required 
                  value={address.street} 
                  onChange={e => setAddress({...address, street: e.target.value})} 
                  style={{ width: '100%', padding: '0.75rem', marginTop: '0.35rem', border: '1px solid var(--color-border)', borderRadius: '6px', fontSize: '0.9rem' }} 
                />
              </div>

              <div className="responsive-flex-row">
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: '500' }}>City</label>
                  <input 
                    placeholder="New York" 
                    required 
                    value={address.city} 
                    onChange={e => setAddress({...address, city: e.target.value})} 
                    style={{ width: '100%', padding: '0.75rem', marginTop: '0.35rem', border: '1px solid var(--color-border)', borderRadius: '6px', fontSize: '0.9rem' }} 
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: '500' }}>ZIP Code</label>
                  <input 
                    placeholder="10001" 
                    required 
                    value={address.zip} 
                    onChange={e => setAddress({...address, zip: e.target.value})} 
                    style={{ width: '100%', padding: '0.75rem', marginTop: '0.35rem', border: '1px solid var(--color-border)', borderRadius: '6px', fontSize: '0.9rem' }} 
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', padding: '0.85rem', borderRadius: '6px' }}>Continue to Payment</button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div style={{ background: '#fff', border: '1px solid var(--color-border)', borderRadius: '10px', padding: '1.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '0.3rem' }}>2. Payment Method</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Select your preferred payment option</p>

            <form onSubmit={handlePaymentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <div style={{ padding: '0.9rem 1rem', border: '1px solid var(--color-border)', borderRadius: '6px', cursor: 'pointer', background: '#fafafa' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input type="radio" name="payment" required defaultChecked />
                  <CreditCard size={18} />
                  <span>Credit / Debit Card</span>
                </label>
              </div>

              <div style={{ padding: '0.9rem 1rem', border: '1px solid var(--color-border)', borderRadius: '6px', cursor: 'pointer', background: '#fafafa' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input type="radio" name="payment" required />
                  <Smartphone size={18} />
                  <span>UPI / Net Banking / GPay</span>
                </label>
              </div>

              <div style={{ padding: '0.9rem 1rem', border: '1px solid var(--color-border)', borderRadius: '6px', cursor: 'pointer', background: '#fafafa' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input type="radio" name="payment" required />
                  <Truck size={18} />
                  <span>Cash on Delivery (COD)</span>
                </label>
              </div>
              
              <div style={{ marginTop: '0.8rem', padding: '1rem', background: '#fdfbf7', border: '1px solid #f2e9dc', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.9rem' }}>Total Amount to Pay:</span>
                <strong style={{ fontSize: '1.2rem', color: '#111' }}>${totalToPay.toLocaleString()}</strong>
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: '0.8rem', padding: '0.85rem', borderRadius: '6px' }}>Place Order</button>
            </form>
          </div>
        )}

        {step === 3 && (
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            style={{ textAlign: 'center', padding: '2.5rem 1.5rem', background: '#fff', border: '1px solid var(--color-border)', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.05)' }}
          >
            <CheckCircle size={54} style={{ color: '#2ecc71', margin: '0 auto 1rem' }} />
            <h2 style={{ marginBottom: '0.5rem', fontSize: '1.6rem' }}>Order Confirmed!</h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>Thank you for your purchase. We are preparing your order.</p>
            
            <div style={{ padding: '1.2rem', border: '1.5px dashed var(--color-accent)', borderRadius: '8px', marginBottom: '1.5rem', background: '#fdfbf7' }}>
              <h4 style={{ marginBottom: '0.3rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Estimated Delivery</h4>
              <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#222' }}>Delivery in 7 Days</p>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>Expected by: {deliveryDate}</p>
            </div>
            
            <button className="btn btn-primary" onClick={() => navigate('/')} style={{ padding: '0.8rem 2rem', borderRadius: '6px' }}>
              Continue Shopping
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Checkout;
