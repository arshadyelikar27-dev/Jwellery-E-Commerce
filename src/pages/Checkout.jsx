import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Smartphone,
  Truck,
  Phone,
  ShieldCheck,
  MapPin,
  Lock,
  Calendar,
  Printer
} from 'lucide-react';
import './Checkout.css';

const countryCodes = [
  { code: '+91', country: 'IN', label: '+91 (India)' },
  { code: '+1', country: 'US', label: '+1 (USA / Canada)' },
  { code: '+44', country: 'GB', label: '+44 (UK)' },
  { code: '+971', country: 'AE', label: '+971 (UAE)' },
  { code: '+61', country: 'AU', label: '+61 (Australia)' },
  { code: '+65', country: 'SG', label: '+65 (Singapore)' }
];

const Checkout = () => {
  const { cartItems: contextCartItems, cartTotal: contextCartTotal, clearCart, removeFromCart, closeCart } = useCart();
  const { addOrder } = useOrders();
  const { user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [createdOrder, setCreatedOrder] = useState(null);

  // Address state with Phone Number option
  const [address, setAddress] = useState({
    name: user?.name || '',
    phone: '',
    countryCode: '+91',
    street: '',
    city: '',
    state: '',
    zip: '',
    deliveryNotes: ''
  });

  useEffect(() => {
    if (closeCart) closeCart();
  }, [closeCart]);

  // Determine items to checkout
  const specificItems = location.state?.checkoutItems;
  const itemsToCheckout = specificItems || contextCartItems;
  const totalToPay = specificItems
    ? specificItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    : contextCartTotal;

  // Expected delivery date: 7 days from now
  const [deliveryDate, setDeliveryDate] = useState('');

  if (itemsToCheckout.length === 0 && step !== 3) {
    return (
      <div className="container py-8" style={{ textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
        <h2>Your Shopping Bag is Empty</h2>
        <p style={{ color: 'var(--color-text-muted)', margin: '1rem 0 1.5rem' }}>
          Please add items to your cart before proceeding to checkout.
        </p>
        <button onClick={() => navigate('/')} className="btn btn-shimmer-gold">
          Return to Collections
        </button>
      </div>
    );
  }

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (!address.phone || address.phone.trim().length < 7) {
      if (addToast) addToast('Please enter a valid delivery contact phone number.', 'error');
      return;
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    const date = new Date();
    date.setDate(date.getDate() + 7);
    const formattedDelivery = date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setDeliveryDate(formattedDelivery);

    const orderPayload = {
      user: user || { name: address.name, email: 'guest@SAFA.com' },
      items: itemsToCheckout,
      total: totalToPay,
      address: {
        ...address,
        formattedPhone: `${address.countryCode} ${address.phone}`
      },
      paymentMethod,
      deliveryDate: formattedDelivery
    };

    addOrder(orderPayload);
    setCreatedOrder(orderPayload);

    if (specificItems) {
      specificItems.forEach((item) => removeFromCart(item.id));
    } else {
      clearCart();
    }

    if (addToast) {
      addToast('Order confirmed! We have dispatched your receipt.');
    }

    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      className="checkout-page-layout container py-8"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ maxWidth: '920px', margin: '0 auto' }}>
        {/* Top Stepper Breadcrumb */}
        {step < 3 && (
          <div style={{ marginBottom: '2.5rem' }}>
            <button
              onClick={() => (step === 2 ? setStep(1) : navigate(-1))}
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

            {/* Stepper Progress Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative',
                maxWidth: '460px',
                margin: '0 auto',
                padding: '0 10px'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '10%',
                  right: '10%',
                  height: '2px',
                  background: '#ede8e1',
                  zIndex: 1
                }}
              >
                <motion.div
                  style={{
                    height: '100%',
                    background: 'var(--color-accent)'
                  }}
                  animate={{ width: step === 1 ? '0%' : '100%' }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    background: step >= 1 ? 'var(--color-obsidian)' : '#ede8e1',
                    color: step >= 1 ? '#dfca9e' : '#888',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '0.85rem',
                    margin: '0 auto 0.4rem',
                    border: '2px solid var(--color-accent)'
                  }}
                >
                  1
                </div>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: step === 1 ? '#111' : '#888' }}>
                  Delivery & Contact
                </span>
              </div>

              <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    background: step === 2 ? 'var(--color-obsidian)' : '#fff',
                    color: step === 2 ? '#dfca9e' : '#888',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '0.85rem',
                    margin: '0 auto 0.4rem',
                    border: step === 2 ? '2px solid var(--color-accent)' : '2px solid #ede8e1'
                  }}
                >
                  2
                </div>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: step === 2 ? '#111' : '#888' }}>
                  Payment & Security
                </span>
              </div>
            </div>
          </div>
        )}

        <div className={`checkout-grid ${step === 3 ? 'step-3' : ''}`}>
          {/* Main Form Area */}
          <div>
            {/* STEP 1: DELIVERY FORM WITH PHONE NUMBER */}
            {step === 1 && (
              <motion.div
                className="glass-card"
                style={{ padding: '2rem', background: '#fff' }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                  <MapPin size={22} color="#c5a97d" />
                  <h2 style={{ fontSize: '1.45rem', margin: 0 }}>Delivery Address & Contact Details</h2>
                </div>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '1.8rem' }}>
                  Please provide your accurate delivery address and phone number for secure courier OTP verification.
                </p>

                <form onSubmit={handleAddressSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  {/* Full Name */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
                      Recipient Full Name *
                    </label>
                    <input
                      placeholder="e.g. Eleanor Vance"
                      required
                      value={address.name}
                      onChange={(e) => setAddress({ ...address, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px',
                        fontSize: '0.92rem',
                        background: '#faf9f7'
                      }}
                    />
                  </div>

                  {/* PHONE NUMBER FIELD WITH COUNTRY CODE (FEATURE REQUEST) */}
                  <div style={{ background: '#fdfbf7', padding: '1.2rem', borderRadius: '10px', border: '1px solid rgba(197, 169, 125, 0.4)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                      <Phone size={16} color="#c5a97d" />
                      <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#1a1a1f' }}>
                        Delivery Phone Number * <span style={{ color: '#c5a97d', fontSize: '0.75rem', display: 'block', marginTop: '2px' }}>(Required for Courier OTP)</span>
                      </label>
                    </div>
                    <div className="checkout-phone-input-row" style={{ display: 'flex', gap: '0.6rem' }}>
                      <select
                        value={address.countryCode}
                        onChange={(e) => setAddress({ ...address, countryCode: e.target.value })}
                        style={{
                          width: '130px',
                          padding: '0.85rem 0.6rem',
                          border: '1px solid var(--color-border)',
                          borderRadius: '8px',
                          fontSize: '0.88rem',
                          background: '#fff',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        {countryCodes.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        placeholder="98765 43210"
                        required
                        value={address.phone}
                        onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                        style={{
                          flex: 1,
                          padding: '0.85rem 1rem',
                          border: '1px solid var(--color-border)',
                          borderRadius: '8px',
                          fontSize: '0.92rem',
                          background: '#fff'
                        }}
                      />
                    </div>
                    <small style={{ display: 'block', color: 'var(--color-text-muted)', fontSize: '0.76rem', marginTop: '0.4rem' }}>
                      We send live GPS dispatch tracking and insured arrival notifications directly to this number.
                    </small>
                  </div>

                  {/* Street Address */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
                      Street Address & Residence *
                    </label>
                    <input
                      placeholder="e.g. 742 Evergreen Terrace, Apt 12B"
                      required
                      value={address.street}
                      onChange={(e) => setAddress({ ...address, street: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px',
                        fontSize: '0.92rem',
                        background: '#faf9f7'
                      }}
                    />
                  </div>

                  {/* City & ZIP */}
                  <div className="city-zip-grid">
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
                        City / Municipality *
                      </label>
                      <input
                        placeholder="e.g. Mumbai / New York"
                        required
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.85rem 1rem',
                          border: '1px solid var(--color-border)',
                          borderRadius: '8px',
                          fontSize: '0.92rem',
                          background: '#faf9f7'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
                        Postal / ZIP Code *
                      </label>
                      <input
                        placeholder="e.g. 400001"
                        required
                        value={address.zip}
                        onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.85rem 1rem',
                          border: '1px solid var(--color-border)',
                          borderRadius: '8px',
                          fontSize: '0.92rem',
                          background: '#faf9f7'
                        }}
                      />
                    </div>
                  </div>

                  {/* Delivery Notes */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.35rem' }}>
                      Special Delivery Instructions / Landmark (Optional)
                    </label>
                    <input
                      placeholder="e.g. Leave with concierge or call before delivery"
                      value={address.deliveryNotes}
                      onChange={(e) => setAddress({ ...address, deliveryNotes: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px',
                        fontSize: '0.92rem',
                        background: '#faf9f7'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-shimmer-gold"
                    style={{ marginTop: '0.8rem', padding: '1rem', width: '100%', borderRadius: '8px' }}
                  >
                    Continue to Payment & Security
                  </button>
                </form>
              </motion.div>
            )}

            {/* STEP 2: PAYMENT METHOD */}
            {step === 2 && (
              <motion.div
                className="glass-card"
                style={{ padding: '2rem', background: '#fff' }}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                  <Lock size={22} color="#c5a97d" />
                  <h2 style={{ fontSize: '1.45rem', margin: 0 }}>Select Secure Payment Option</h2>
                </div>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '1.8rem' }}>
                  All transactions are 256-bit encrypted and insured by SAFA Vault Protection.
                </p>

                {/* Delivery Review Card */}
                <div
                  style={{
                    background: '#faf8f5',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    padding: '1rem 1.25rem',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#8c734b', fontWeight: 600 }}>
                      Delivering To:
                    </span>
                    <p style={{ fontSize: '0.9rem', fontWeight: 600, margin: '0.2rem 0' }}>
                      {address.name} â€¢ <span style={{ color: '#c5a97d' }}>{address.countryCode} {address.phone}</span>
                    </p>
                    <small style={{ color: 'var(--color-text-muted)' }}>
                      {address.street}, {address.city} {address.zip}
                    </small>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    style={{ fontSize: '0.8rem', color: 'var(--color-accent)', fontWeight: 600, textDecoration: 'underline' }}
                  >
                    Edit
                  </button>
                </div>

                <form onSubmit={handlePaymentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* Option 1: Card */}
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1.1rem 1.25rem',
                      border: paymentMethod === 'card' ? '2px solid var(--color-accent)' : '1px solid var(--color-border)',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      background: paymentMethod === 'card' ? '#fdfbf7' : '#fff',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      style={{ accentColor: '#c5a97d' }}
                    />
                    <CreditCard size={20} color="#c5a97d" />
                    <div style={{ flex: 1 }}>
                      <strong>Credit / Debit Card (Visa, MasterCard, Amex)</strong>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                        Instant verification â€¢ Complimentary insurance
                      </div>
                    </div>
                  </label>

                  {/* Option 2: UPI / GPay */}
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1.1rem 1.25rem',
                      border: paymentMethod === 'upi' ? '2px solid var(--color-accent)' : '1px solid var(--color-border)',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      background: paymentMethod === 'upi' ? '#fdfbf7' : '#fff',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      style={{ accentColor: '#c5a97d' }}
                    />
                    <Smartphone size={20} color="#c5a97d" />
                    <div style={{ flex: 1 }}>
                      <strong>UPI / Net Banking / Google Pay</strong>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                        Scan & pay with any UPI App or bank gateway
                      </div>
                    </div>
                  </label>

                  {/* Option 3: COD */}
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1.1rem 1.25rem',
                      border: paymentMethod === 'cod' ? '2px solid var(--color-accent)' : '1px solid var(--color-border)',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      background: paymentMethod === 'cod' ? '#fdfbf7' : '#fff',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      style={{ accentColor: '#c5a97d' }}
                    />
                    <Truck size={20} color="#c5a97d" />
                    <div style={{ flex: 1 }}>
                      <strong>Cash / Card on Delivery (COD)</strong>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                        Pay safely upon courier arrival with identity verification
                      </div>
                    </div>
                  </label>

                  <button
                    type="submit"
                    className="btn btn-shimmer-gold"
                    style={{ marginTop: '1.2rem', padding: '1.1rem', width: '100%', borderRadius: '8px', fontSize: '0.9rem' }}
                  >
                    Authorize & Complete Order (â‚¹{totalToPay.toLocaleString('en-IN')})
                  </button>
                </form>
              </motion.div>
            )}

            {/* STEP 3: ORDER CONFIRMED */}
            {step === 3 && createdOrder && (
              <motion.div
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                style={{
                  textAlign: 'center',
                  padding: '3rem 2rem',
                  background: '#fff',
                  border: '1px solid var(--color-border)',
                  borderRadius: '16px',
                  boxShadow: '0 16px 45px rgba(0,0,0,0.06)',
                  maxWidth: '680px',
                  margin: '0 auto'
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: '#f0fdf4',
                    color: '#16a34a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    border: '2px solid #bbf7d0'
                  }}
                >
                  <CheckCircle2 size={38} />
                </div>

                <span className="luxury-badge" style={{ marginBottom: '0.8rem' }}>
                  Order Confirmed
                </span>
                <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Thank You For Your Purchase</h2>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: '2rem' }}>
                  Our master jewelers are hand-preparing and inspecting your certified pieces.
                </p>

                {/* Delivery Date Highlight */}
                <div
                  style={{
                    padding: '1.5rem',
                    border: '1.5px dashed var(--color-accent)',
                    borderRadius: '12px',
                    marginBottom: '2rem',
                    background: '#fdfbf7',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                    <Calendar size={18} color="#c5a97d" />
                    <strong style={{ fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#8c734b' }}>
                      Estimated Insured Delivery
                    </strong>
                  </div>
                  <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#16161a', margin: '0.2rem 0' }}>
                    {deliveryDate} (within 7 business days)
                  </p>
                  
                  {/* Verified Delivery Contact Info */}
                  <div style={{ marginTop: '1rem', paddingTop: '0.85rem', borderTop: '1px solid #ede8e1', fontSize: '0.88rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#222' }}>
                      <Phone size={15} color="#c5a97d" />
                      <strong>Contact Phone:</strong> {createdOrder.address.formattedPhone || `${createdOrder.address.countryCode} ${createdOrder.address.phone}`}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#555', marginTop: '0.3rem' }}>
                      <MapPin size={15} color="#c5a97d" />
                      <span>{createdOrder.address.street}, {createdOrder.address.city} {createdOrder.address.zip}</span>
                    </div>
                  </div>
                </div>

                {/* Ordered Items Summary */}
                <div style={{ textAlign: 'left', marginBottom: '2rem', borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
                  <h4 style={{ fontSize: '0.95rem', marginBottom: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                    Purchased Creations:
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {createdOrder.items.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px' }}
                        />
                        <div style={{ flex: 1 }}>
                          <strong style={{ fontSize: '0.9rem' }}>{item.name}</strong>
                          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                            Qty: {item.quantity} â€¢ â‚¹{item.price.toLocaleString('en-IN')}
                          </div>
                        </div>
                        <div style={{ fontWeight: '600' }}>â‚¹{(item.price * item.quantity).toLocaleString('en-IN')}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="checkout-actions">
                  <button
                    className="btn btn-outline"
                    onClick={() => window.print()}
                    style={{ padding: '0.8rem 1.8rem', borderRadius: '8px' }}
                  >
                    <Printer size={16} /> Print Order Receipt
                  </button>
                  <button
                    className="btn btn-shimmer-gold"
                    onClick={() => navigate('/')}
                    style={{ padding: '0.8rem 2.2rem', borderRadius: '8px' }}
                  >
                    Continue Shopping
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Summary Column (Steps 1 & 2) */}
          {step < 3 && (
            <div>
              <div
                className="glass-card"
                style={{ padding: '1.5rem', background: '#fff', position: 'sticky', top: '100px' }}
              >
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1.2rem', paddingBottom: '0.6rem', borderBottom: '1px solid var(--color-border)' }}>
                  Order Summary ({itemsToCheckout.length} {itemsToCheckout.length === 1 ? 'item' : 'items'})
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxHeight: '240px', overflowY: 'auto', paddingRight: '0.3rem', marginBottom: '1.2rem' }}>
                  {itemsToCheckout.map((item) => (
                    <div key={item.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #eee' }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                          Qty: {item.quantity} Ã— â‚¹{item.price.toLocaleString('en-IN')}
                        </div>
                      </div>
                      <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>
                        â‚¹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)' }}>
                    <span>Subtotal:</span>
                    <span>â‚¹{totalToPay.toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a' }}>
                    <span>Insured White-Glove Courier:</span>
                    <span style={{ fontWeight: 600 }}>FREE</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)' }}>
                    <span>Velvet Presentation Box:</span>
                    <span style={{ fontWeight: 600, color: '#c5a97d' }}>COMPLIMENTARY</span>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      borderTop: '2px solid var(--color-border)',
                      paddingTop: '0.85rem',
                      marginTop: '0.5rem',
                      fontSize: '1.15rem',
                      fontWeight: 'bold',
                      color: 'var(--color-obsidian)'
                    }}
                  >
                    <span>Total Amount:</span>
                    <span style={{ color: 'var(--color-obsidian)' }}>â‚¹{totalToPay.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div style={{ marginTop: '1.2rem', padding: '0.85rem', background: '#fdfbf7', borderRadius: '8px', border: '1px solid rgba(197, 169, 125, 0.3)', display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.78rem', color: '#8c734b' }}>
                  <ShieldCheck size={18} flexShrink={0} />
                  <span>Includes IGI diamond certificates & tamper-evident security seal.</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;
