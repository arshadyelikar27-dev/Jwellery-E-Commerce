import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Zap } from 'lucide-react';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="product-details-container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <h2>Product not found</h2>
        <button onClick={() => navigate('/')} className="back-btn" style={{ marginTop: '1rem' }}>
          <ArrowLeft size={16} /> Return to Home
        </button>
      </div>
    );
  }

  const handleBuyNow = () => {
    addToCart(product);
    navigate('/checkout', { state: { checkoutItems: [{ ...product, quantity: 1 }] } });
  };

  return (
    <motion.div 
      className="product-details-container"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="back-btn-wrapper">
        <button onClick={() => navigate(-1)} className="back-btn">
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      <div className="product-details-card">
        <div className="product-image-box">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-info-box">
          <span className="product-badge">Fine Jewelry</span>
          <h1 className="product-title">{product.name}</h1>
          <div className="product-price">${product.price.toLocaleString()}</div>
          
          <div className="product-desc">
            {product.description}
          </div>
          
          <div className="product-specs-box">
            <h4>Specifications</h4>
            <p>{product.details}</p>
          </div>

          <div className="product-actions-group">
            <button 
              className="btn-add-cart" 
              onClick={() => addToCart(product)}
            >
              <ShoppingBag size={16} /> Add to Cart
            </button>
            <button 
              className="btn-buy-now" 
              onClick={handleBuyNow}
            >
              <Zap size={16} /> Buy Now
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;

