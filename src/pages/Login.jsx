import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(email, password);
    if (result.success) {
      if (result.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      alert(result.message);
    }
  };

  return (
    <motion.div 
      className="container py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button onClick={() => navigate(-1)} className="btn btn-outline" style={{ marginBottom: '1rem', padding: '0.4rem 1rem' }}>&larr; Back</button>
      <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem', border: '1px solid var(--color-border)' }}>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
          <div>
            <label>Email (admin@example.com for admin)</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              style={{ width: '100%', padding: '0.8rem', marginTop: '0.5rem', border: '1px solid var(--color-border)' }} 
            />
          </div>
          <div>
            <label>Password (admin123 for admin)</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={{ width: '100%', padding: '0.8rem', marginTop: '0.5rem', border: '1px solid var(--color-border)' }} 
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>Sign In</button>
        </form>
        <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
