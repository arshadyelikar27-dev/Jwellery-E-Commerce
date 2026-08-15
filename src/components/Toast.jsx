import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import './Toast.css';

const Toast = ({ toasts, onRemove }) => {
  return (
    <div className="luxury-toast-container">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            className={`luxury-toast ${toast.type}`}
            initial={{ opacity: 0, y: 30, scale: 0.92, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, scale: 0.9, filter: 'blur(4px)' }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            layout
          >
            <div className="toast-glow-border" />
            <div className="toast-icon">
              {toast.type === 'error' ? (
                <AlertCircle size={18} />
              ) : (
                <CheckCircle2 size={18} />
              )}
            </div>
            <div className="toast-body">
              <p className="toast-text">{toast.message}</p>
            </div>
            <button className="toast-close" onClick={() => onRemove(toast.id)}>
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast;
