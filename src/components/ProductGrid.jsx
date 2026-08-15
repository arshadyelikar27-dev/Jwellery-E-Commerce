import React from 'react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ProductGrid.css';

const ProductGrid = () => {
  const { addToCart } = useCart();
  const { products } = useProducts();

  return (
    <section className="product-section container py-8" id="collections">
      <div className="section-header text-center mb-4">
        <h2>Curated Selection</h2>
        <p className="subtitle">Exceptional pieces for extraordinary moments.</p>
      </div>
      
      <div className="product-grid">
        {products.map((product, i) => (
          <motion.div 
            key={product.id} 
            className="product-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
          >
            <div className="product-image-wrapper">
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} />
              </Link>
              <div className="product-overlay">
                <button 
                  className="btn btn-primary add-to-cart"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <div className="product-info">
              <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3>{product.name}</h3>
              </Link>
              <p className="price">${product.price.toLocaleString()}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
