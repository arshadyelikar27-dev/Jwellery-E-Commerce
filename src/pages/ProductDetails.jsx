import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <div className="container py-8"><h2>Product not found</h2></div>;
  }

  return (
    <motion.div 
      className="container py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{ width: '100%', marginBottom: '2rem' }}>
        <button onClick={() => navigate(-1)} className="btn btn-outline" style={{ padding: '0.4rem 1rem' }}>&larr; Back</button>
      </div>
      <div className="responsive-flex">
        <div>
          <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{product.name}</h1>
          <p style={{ fontSize: '1.5rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>${product.price.toLocaleString()}</p>
        
        <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>{product.description}</p>
        
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ marginBottom: '0.5rem' }}>Specifications:</h4>
          <p style={{ color: 'var(--color-text-muted)' }}>{product.details}</p>
        </div>

        <button 
          className="btn btn-primary" 
          onClick={() => addToCart(product)}
          style={{ width: '100%', maxWidth: '300px' }}
        >
          Add to Cart
        </button>
      </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
