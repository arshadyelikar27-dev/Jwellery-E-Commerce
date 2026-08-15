import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

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
    return <div className="container py-8">No items to checkout.</div>;
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
    <motion.div className="container py-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <button onClick={() => navigate(-1)} className="btn btn-outline" style={{ marginBottom: '1rem', padding: '0.4rem 1rem' }}>&larr; Back</button>
      <h2>Checkout</h2>
      
      {step === 1 && (
        <div style={{ maxWidth: '500px', marginTop: '2rem' }}>
          <h3>1. Shipping Address</h3>
          <form onSubmit={handleAddressSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <input placeholder="Full Name" required value={address.name} onChange={e => setAddress({...address, name: e.target.value})} style={{ padding: '0.8rem', border: '1px solid var(--color-border)' }} />
            <input placeholder="Street Address" required value={address.street} onChange={e => setAddress({...address, street: e.target.value})} style={{ padding: '0.8rem', border: '1px solid var(--color-border)' }} />
            <div className="responsive-flex-row">
              <input placeholder="City" required value={address.city} onChange={e => setAddress({...address, city: e.target.value})} style={{ padding: '0.8rem', flex: 1, border: '1px solid var(--color-border)' }} />
              <input placeholder="ZIP Code" required value={address.zip} onChange={e => setAddress({...address, zip: e.target.value})} style={{ padding: '0.8rem', flex: 1, border: '1px solid var(--color-border)' }} />
            </div>
            <button type="submit" className="btn btn-primary">Continue to Payment</button>
          </form>
        </div>
      )}

      {step === 2 && (
        <div style={{ maxWidth: '500px', marginTop: '2rem' }}>
          <h3>2. Payment Method</h3>
          <form onSubmit={handlePaymentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '4px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="radio" name="payment" required defaultChecked />
                Credit/Debit Card
              </label>
            </div>
            <div style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '4px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="radio" name="payment" required />
                UPI / Net Banking
              </label>
            </div>
            <div style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '4px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="radio" name="payment" required />
                Cash on Delivery (COD)
              </label>
            </div>
            
            <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--color-bg-alt)' }}>
              <strong>Total to pay: ${totalToPay.toLocaleString()}</strong>
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>Place Order</button>
            <button type="button" className="btn" onClick={() => setStep(1)}>Back</button>
          </form>
        </div>
      )}

      {step === 3 && (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ maxWidth: '600px', marginTop: '2rem', textAlign: 'center', padding: '3rem', background: 'var(--color-bg-alt)', borderRadius: '8px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
          <h2 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>Order Confirmed!</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Thank you for your purchase. Your order has been successfully placed.</p>
          <div style={{ padding: '1.5rem', border: '1px dashed var(--color-border)', borderRadius: '8px', marginBottom: '2rem', background: 'var(--color-bg)' }}>
            <h4 style={{ marginBottom: '0.5rem' }}>Estimated Delivery</h4>
            <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Delivering in 7 Days</p>
            <p style={{ color: 'var(--color-text-muted)' }}>Expected on: {deliveryDate}</p>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/')} style={{ padding: '0.8rem 2rem' }}>
            Continue Shopping
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Checkout;
