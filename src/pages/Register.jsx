import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, UserPlus } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = register(name, email, password);
    if (result.success) {
      if (addToast) addToast(`Welcome to SAFA, ${name}! Your account is ready.`);
      navigate('/');
    } else {
      if (addToast) addToast(result.message, 'error');
      else alert(result.message);
    }
  };

  return (
    <motion.div
      className="container py-8"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ maxWidth: '440px', margin: '0 auto' }}>
        <button
          onClick={() => navigate(-1)}
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

        <div className="glass-card" style={{ padding: '2.5rem 2rem', background: '#fff' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#faf8f5', border: '1px dashed var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <UserPlus size={24} color="#c5a97d" />
            </div>
            <span className="luxury-badge" style={{ marginBottom: '0.5rem' }}>Join The Maison</span>
            <h2 style={{ fontSize: '1.75rem', marginTop: '0.4rem', marginBottom: '0.3rem' }}>Create Account</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
              Enjoy bespoke privileges, private previews & tracking.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Lady Clara"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
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
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="clara@luxury.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Password
              </label>
              <input
                type="password"
                placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
              style={{ marginTop: '0.5rem', width: '100%', padding: '0.95rem', borderRadius: '8px', fontSize: '0.88rem' }}
            >
              Join SAFA Maison
            </button>
          </form>

          <p style={{ marginTop: '1.8rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ fontWeight: 600, color: 'var(--color-obsidian)', textDecoration: 'underline' }}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;
