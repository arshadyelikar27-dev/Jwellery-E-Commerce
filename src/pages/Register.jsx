import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button onClick={() => navigate(-1)} className="btn btn-outline" style={{ marginBottom: '1rem', padding: '0.4rem 1rem' }}>&larr; Back</button>
      <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem', border: '1px solid var(--color-border)' }}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
          <div>
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '0.8rem', marginTop: '0.5rem', border: '1px solid var(--color-border)' }} />
          </div>
          <div>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '0.8rem', marginTop: '0.5rem', border: '1px solid var(--color-border)' }} />
          </div>
          <div>
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '0.8rem', marginTop: '0.5rem', border: '1px solid var(--color-border)' }} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>Sign Up</button>
        </form>
        <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Register;
