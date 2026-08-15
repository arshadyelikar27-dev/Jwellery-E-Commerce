import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ShoppingBag,
  Zap,
  ChevronDown,
  ChevronUp,
  Share2,
  Check
} from 'lucide-react';
import SwipeRevealImage from '../components/SwipeRevealImage';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart, closeCart } = useCart();
  const { addToast } = useToast();
  
  const [selectedRingSize, setSelectedRingSize] = useState('6 (US)');
  const [activeAccordion, setActiveAccordion] = useState('specs');
  const [copied, setCopied] = useState(false);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="container py-8 text-center" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Creation Not Found</h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>This masterpiece may have been archived or is part of a private catalog.</p>
        <button onClick={() => navigate('/')} className="btn btn-shimmer-gold">
          Return to High Jewelry
        </button>
      </div>
    );
  }

  const isRing = product.category === 'Rings' || product.category === 'Solitaire & Rings';

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      if (addToast) addToast('Private link copied to clipboard.');
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, isRing ? selectedRingSize : null);
    if (addToast) {
      addToast(`Added "${product.name}" to your luxury shopping bag.`);
    }
  };

  const handleBuyNow = () => {
    addToCart(product, isRing ? selectedRingSize : null);
    if (closeCart) closeCart();
    navigate('/checkout');
  };

  const toggleAccordion = (key) => {
    setActiveAccordion(activeAccordion === key ? null : key);
  };

  return (
    <motion.div
      className="product-details-page container"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Top Breadcrumb & Share */}
      <div className="product-top-nav">
        <button onClick={() => navigate(-1)} className="back-nav-btn" aria-label="Go back to collections">
          <ArrowLeft size={16} />
          <span>Back to Collections</span>
        </button>
        <button onClick={handleShare} className="share-btn" aria-label="Share this creation">
          {copied ? <Check size={16} color="#c5a97d" /> : <Share2 size={16} />}
          <span>{copied ? 'Link Copied' : 'Share Creation'}</span>
        </button>
      </div>

      <div className="product-main-layout">
        {/* Left Column: Product Gallery with 21st.dev Swipe Reveal */}
        <div className="product-gallery-column">
          <div className="gallery-sticky-frame">
            <div className="main-image-card">
              <SwipeRevealImage
                src={product.image}
                alt={product.name}
                aspectRatio="1/1"
                curtainColor="gold"
                direction="left-to-right"
                delay={0.1}
              />
              <div className="image-luxury-watermark">
                <span>AURELIA ATELIER</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Product Details & Purchase Actions */}
        <div className="product-details-column">
          <div className="product-header-info">

            <h1 className="details-title">{product.name}</h1>
            <div className="details-price-row">
              <span className="main-price">₹{product.price.toLocaleString('en-IN')}</span>
              <span className="tax-inclusive-tag">Includes all applicable luxury duties & taxes</span>
            </div>
          </div>

          <p className="details-description">{product.description}</p>

          {/* Size Selector for Rings */}
          {isRing && (
            <div className="size-selector-section">
              <div className="size-header">
                <label>Select Ring Size (US):</label>
                <span className="size-guide-link">Need size assistance?</span>
              </div>
              <div className="size-pills-row">
                {['5 (US)', '6 (US)', '7 (US)', '8 (US)', '9 (US)'].map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`size-btn ${selectedRingSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedRingSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div className="product-action-buttons">
            <button className="btn btn-shimmer-gold add-bag-action" onClick={handleAddToCart}>
              <ShoppingBag size={18} />
              <span>Add to Shopping Bag</span>
            </button>
            <button className="btn btn-primary buy-now-action" onClick={handleBuyNow}>
              <Zap size={18} />
              <span>Instant Checkout</span>
            </button>
          </div>

          {/* 21st.dev Luxury Accordion Section */}
          <div className="details-accordion-group">
            {/* Accordion 1: Specifications */}
            <div className="accordion-item">
              <button
                className="accordion-header"
                onClick={() => toggleAccordion('specs')}
              >
                <span>Material & Gemstone Specifications</span>
                {activeAccordion === 'specs' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              <AnimatePresence>
                {activeAccordion === 'specs' && (
                  <motion.div
                    className="accordion-body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{product.details}</p>
                    <ul className="spec-bullet-list">
                      <li><strong>Setting Type:</strong> Precision Micro-Prong & Bezel setting</li>
                      <li><strong>Hallmarking:</strong> Official 750 / 18K Gold hallmark stamp</li>
                      <li><strong>Origin:</strong> Handcrafted in the Aurelia Paris Atelier</li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion 2: Luxury Packaging */}
            <div className="accordion-item">
              <button
                className="accordion-header"
                onClick={() => toggleAccordion('packaging')}
              >
                <span>Signature Packaging & Certificate</span>
                {activeAccordion === 'packaging' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              <AnimatePresence>
                {activeAccordion === 'packaging' && (
                  <motion.div
                    className="accordion-body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>
                      Every order arrives encased in our signature velvet-lined Aurelia presentation box, wrapped with gold-embossed satin ribbon, accompanied by an individual Certificate of Authenticity and microfiber travel pouch.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion 3: Delivery & Complimentary Resizing */}
            <div className="accordion-item">
              <button
                className="accordion-header"
                onClick={() => toggleAccordion('delivery')}
              >
                <span>Delivery & Complimentary Resizing</span>
                {activeAccordion === 'delivery' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              <AnimatePresence>
                {activeAccordion === 'delivery' && (
                  <motion.div
                    className="accordion-body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>
                      We provide insured door-to-door express delivery with signature required upon receipt. If your ring requires adjustments, Aurelia provides one complimentary ring resizing within 60 days of purchase.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bar */}
      <div className="mobile-sticky-action-bar">
        <div className="mobile-bar-price">
          <span>Total</span>
          <strong>₹{product.price.toLocaleString('en-IN')}</strong>
        </div>
        <button className="btn btn-shimmer-gold mobile-bar-btn" onClick={handleAddToCart}>
          <ShoppingBag size={16} /> Add to Bag
        </button>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
