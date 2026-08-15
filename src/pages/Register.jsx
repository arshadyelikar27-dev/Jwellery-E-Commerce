import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    register(email, password, name);
    navigate('/');
  };

  return (
    <motion.div 
      className="container py-8"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ maxWidth: '420px', margin: '0 auto' }}>
        <button 
          onClick={() => navigate(-1)} 
          className="btn btn-outline" 
          style={{ marginBottom: '1.2rem', padding: '0.45rem 0.9rem', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div style={{ padding: '2rem 1.5rem', background: '#fff', border: '1px solid var(--color-border)', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '0.3rem' }}>Sign Up</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Create an account to start shopping</p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: '500' }}>Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe"
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                style={{ width: '100%', padding: '0.75rem', marginTop: '0.35rem', border: '1px solid var(--color-border)', borderRadius: '6px', fontSize: '0.9rem' }} 
              />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: '500' }}>Email Address</label>
              <input 
                type="email" 
                placeholder="john@example.com"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                style={{ width: '100%', padding: '0.75rem', marginTop: '0.35rem', border: '1px solid var(--color-border)', borderRadius: '6px', fontSize: '0.9rem' }} 
              />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: '500' }}>Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                style={{ width: '100%', padding: '0.75rem', marginTop: '0.35rem', border: '1px solid var(--color-border)', borderRadius: '6px', fontSize: '0.9rem' }} 
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', width: '100%', padding: '0.8rem', borderRadius: '6px' }}>Sign Up</button>
          </form>

          <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
            Already have an account? <Link to="/login" style={{ fontWeight: '600', color: 'var(--color-text)' }}>Sign In</Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;
