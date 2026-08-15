import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { useToast } from '../context/ToastContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Eye, ArrowRight, Heart } from 'lucide-react';
import SwipeRevealImage from './SwipeRevealImage';
import './ProductGrid.css';

const categories = [
  { id: 'all', label: 'All Creations' },
  { id: 'rings', label: 'Rings & Solitaires' },
  { id: 'necklaces', label: 'Necklaces & Pendants' },
  { id: 'earrings', label: 'Earrings' },
  { id: 'bracelets', label: 'Bracelets & Bangles' },
  { id: 'watches', label: 'Timepieces' }
];

const ProductGrid = () => {
  const { addToCart } = useCart();
  const { products } = useProducts();
  const { addToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [wishlist, setWishlist] = useState({});

  // Filter products by category keyword matching
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return products;
    if (selectedCategory === 'rings') {
      return products.filter(p => p.name.toLowerCase().includes('ring'));
    }
    if (selectedCategory === 'necklaces') {
      return products.filter(p => p.name.toLowerCase().includes('necklace') || p.name.toLowerCase().includes('pendant'));
    }
    if (selectedCategory === 'earrings') {
      return products.filter(p => p.name.toLowerCase().includes('earring') || p.name.toLowerCase().includes('hoop'));
    }
    if (selectedCategory === 'bracelets') {
      return products.filter(p => p.name.toLowerCase().includes('bracelet') || p.name.toLowerCase().includes('bangle') || p.name.toLowerCase().includes('brooch'));
    }
    if (selectedCategory === 'watches') {
      return products.filter(p => p.name.toLowerCase().includes('watch') || p.name.toLowerCase().includes('timepiece'));
    }
    return products;
  }, [products, selectedCategory]);

  const handleAddToCart = (product, e) => {
    if (e) e.stopPropagation();
    addToCart(product);
    if (addToast) {
      addToast(`Added "${product.name}" to your shopping bag.`);
    }
  };

  const toggleWishlist = (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist(prev => {
      const updated = { ...prev, [productId]: !prev[productId] };
      if (addToast) {
        addToast(updated[productId] ? 'Added to your private wishlist' : 'Removed from wishlist');
      }
      return updated;
    });
  };

  return (
    <section className="product-section py-8" id="collections">
      <div className="container">
        <div className="section-header text-center mb-4">
          <div className="header-eyebrow">
            <span>High Jewelry Collection</span>
          </div>
          <h2 className="section-title">The SAFA Curation</h2>
          <p className="subtitle">Meticulously handcrafted with rare diamonds and 18K precious metals.</p>
        </div>

        {/* 21st.dev Category Pills */}
        <div className="category-filter-bar">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-pill ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
              {selectedCategory === cat.id && (
                <motion.div
                  layoutId="activeCategoryIndicator"
                  className="pill-active-bg"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Product Grid with Swipe Reveal */}
        <div className="product-grid">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                className="luxury-product-card"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              >
                {/* Image Container with Swipe Reveal Curtain Animation */}
                <div className="product-image-container">
                  <Link to={`/product/${product.id}`} className="image-link-wrapper">
                    <SwipeRevealImage
                      src={product.image}
                      alt={product.name}
                      aspectRatio="1/1"
                      curtainColor={i % 2 === 0 ? 'gold' : 'dark'}
                      direction={i % 2 === 0 ? 'left-to-right' : 'right-to-left'}
                      delay={0.05 + (i % 3) * 0.05}
                      hoverZoom={true}
                    />
                  </Link>

                  {/* Badge Pills */}
                  <div className="card-top-badges">
                    {i === 0 && <span className="product-tag gold-tag">Bestseller</span>}
                    {i === 1 && <span className="product-tag dark-tag">Limited</span>}
                    {product.stock <= 3 && <span className="product-tag alert-tag">Only {product.stock} Left</span>}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    className={`wishlist-btn ${wishlist[product.id] ? 'active' : ''}`}
                    onClick={(e) => toggleWishlist(product.id, e)}
                    aria-label="Save to Wishlist"
                  >
                    <Heart size={16} fill={wishlist[product.id] ? '#c5a97d' : 'none'} color={wishlist[product.id] ? '#c5a97d' : '#222'} />
                  </button>

                  {/* Hover Floating Actions */}
                  <div className="card-hover-actions">
                    <button
                      className="quick-view-btn"
                      onClick={() => setQuickViewProduct(product)}
                      title="Quick Look"
                    >
                      <Eye size={15} />
                      <span>Quick View</span>
                    </button>
                    <button
                      className="quick-add-btn"
                      onClick={(e) => handleAddToCart(product, e)}
                    >
                      <ShoppingBag size={15} />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>

                {/* Card Info */}
                <div className="product-info-block">
                  <div className="product-meta-row">
                    <span className="stock-indicator">
                      <span className="stock-dot" /> In Stock
                    </span>
                  </div>

                  <Link to={`/product/${product.id}`} className="product-title-link">
                    <h3 className="product-name">{product.name}</h3>
                  </Link>

                  <div className="product-price-row">
                    <span className="product-price-tag">₹{product.price.toLocaleString('en-IN')}</span>
                  </div>

                  {/* Mobile Quick Add Button */}
                  <button
                    className="mobile-quick-add"
                    onClick={(e) => handleAddToCart(product, e)}
                  >
                    <ShoppingBag size={14} />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>


      </div>

      {/* 21st.dev Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <div className="quickview-overlay" onClick={() => setQuickViewProduct(null)}>
            <motion.div
              className="quickview-modal"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="quickview-close-btn" onClick={() => setQuickViewProduct(null)}>
                &times;
              </button>
              <div className="quickview-layout">
                <div className="quickview-image-col">
                  <SwipeRevealImage
                    src={quickViewProduct.image}
                    alt={quickViewProduct.name}
                    aspectRatio="1/1"
                    curtainColor="gold"
                  />
                </div>
                <div className="quickview-info-col">
                  <h2>{quickViewProduct.name}</h2>
                  <div className="quickview-price">₹{quickViewProduct.price.toLocaleString('en-IN')}</div>
                  <p className="quickview-desc">{quickViewProduct.description}</p>
                  
                  <div className="quickview-specs">
                    <strong>Specifications:</strong>
                    <p>{quickViewProduct.details}</p>
                  </div>

                  <div className="quickview-actions">
                    <button
                      className="btn btn-shimmer-gold"
                      style={{ width: '100%' }}
                      onClick={() => {
                        handleAddToCart(quickViewProduct);
                        setQuickViewProduct(null);
                      }}
                    >
                      <ShoppingBag size={16} /> Add to Bag
                    </button>
                    <Link
                      to={`/product/${quickViewProduct.id}`}
                      className="btn btn-outline"
                      style={{ width: '100%', marginTop: '0.6rem' }}
                      onClick={() => setQuickViewProduct(null)}
                    >
                      View Full Details <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProductGrid;
