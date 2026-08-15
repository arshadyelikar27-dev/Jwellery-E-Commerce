import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { useOrders } from '../context/OrderContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Package,
  Users,
  Phone,
  MapPin,
  Mail,
  Calendar,
  Trash2,
  PlusCircle,
  Shield,
  Truck
} from 'lucide-react';

const AdminDashboard = () => {
  const { user, allUsers, logout } = useAuth();
  const { products, addProduct, deleteProduct } = useProducts();
  const { orders, updateOrderStatus } = useOrders();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('orders');

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    details: '',
    image: '/assets/product_ring.jpg',
    stock: ''
  });

  if (!user || !user.isAdmin) {
    return (
      <div className="container py-8 text-center" style={{ maxWidth: '480px', margin: '0 auto' }}>
        <h2>Maison Access Restricted</h2>
        <p style={{ color: 'var(--color-text-muted)', margin: '1rem 0 1.5rem' }}>
          This administrative control room is reserved exclusively for verified Aurelia managers.
        </p>
        <button onClick={() => navigate('/login')} className="btn btn-primary">
          Sign in as Administrator
        </button>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    addProduct({
      name: newProduct.name,
      price: Number(newProduct.price),
      description: newProduct.description,
      details: newProduct.details,
      image: newProduct.image,
      stock: Number(newProduct.stock)
    });
    if (addToast) addToast(`Product "${newProduct.name}" created successfully.`);
    setNewProduct({ name: '', price: '', description: '', details: '', image: '/assets/product_ring.jpg', stock: '' });
  };

  const handleDeleteProduct = (id, name) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from the boutique?`)) {
      deleteProduct(id);
      if (addToast) addToast(`Product "${name}" deleted.`);
    }
  };

  return (
    <motion.div className="container py-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Top Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => navigate('/')}
            className="btn btn-outline"
            style={{ padding: '0.45rem 0.9rem', fontSize: '0.8rem', borderRadius: '6px' }}
          >
            <ArrowLeft size={16} /> Boutique Front
          </button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={18} color="#c5a97d" />
              <h1 style={{ fontSize: '1.6rem', margin: 0 }}>Aurelia Atelier Manager</h1>
            </div>
            <small style={{ color: 'var(--color-text-muted)' }}>Logged in as: {user.name} ({user.email})</small>
          </div>
        </div>

        <button
          className="btn btn-outline"
          onClick={handleLogout}
          style={{ padding: '0.45rem 1.1rem', fontSize: '0.8rem', borderRadius: '6px', color: '#c53030' }}
        >
          Sign Out
        </button>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '2rem',
          borderBottom: '1px solid var(--color-border)',
          paddingBottom: '0.5rem'
        }}
      >
        <button
          onClick={() => setActiveTab('orders')}
          style={{
            padding: '0.65rem 1.25rem',
            background: activeTab === 'orders' ? 'var(--color-obsidian)' : 'transparent',
            color: activeTab === 'orders' ? '#dfca9e' : 'var(--color-text-muted)',
            borderRadius: '8px',
            fontSize: '0.85rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer'
          }}
        >
          <Truck size={16} /> Orders & Delivery ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab('products')}
          style={{
            padding: '0.65rem 1.25rem',
            background: activeTab === 'products' ? 'var(--color-obsidian)' : 'transparent',
            color: activeTab === 'products' ? '#dfca9e' : 'var(--color-text-muted)',
            borderRadius: '8px',
            fontSize: '0.85rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer'
          }}
        >
          <Package size={16} /> Manage Inventory ({products.length})
        </button>

        <button
          onClick={() => setActiveTab('users')}
          style={{
            padding: '0.65rem 1.25rem',
            background: activeTab === 'users' ? 'var(--color-obsidian)' : 'transparent',
            color: activeTab === 'users' ? '#dfca9e' : 'var(--color-text-muted)',
            borderRadius: '8px',
            fontSize: '0.85rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer'
          }}
        >
          <Users size={16} /> Customer Database ({allUsers?.length || 0})
        </button>
      </div>

      {/* TAB 1: ORDERS & TRACKING WITH PHONE NUMBER */}
      {activeTab === 'orders' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
            <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Orders Dispatch & Courier Tracking</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              Phone verification enabled for all shipments
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {orders.length === 0 ? (
              <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--color-text-muted)' }}>No customer orders placed yet.</p>
              </div>
            ) : (
              orders.map((order) => {
                const phoneDisplay = order.address?.formattedPhone || (order.address?.phone ? `${order.address?.countryCode || ''} ${order.address?.phone}` : 'Not Provided');

                return (
                  <div
                    key={order.id}
                    className="glass-card"
                    style={{
                      padding: '1.8rem',
                      background: '#fff',
                      borderRadius: '12px',
                      border: '1px solid var(--color-border)'
                    }}
                  >
                    {/* Order Top Bar */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        paddingBottom: '1.2rem',
                        borderBottom: '1px solid #f0ede7'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          <strong style={{ fontSize: '1.1rem', color: 'var(--color-obsidian)' }}>{order.id}</strong>
                          <span
                            style={{
                              fontSize: '0.72rem',
                              padding: '0.2rem 0.6rem',
                              borderRadius: '20px',
                              background:
                                order.status === 'Delivered'
                                  ? '#dcfce7'
                                  : order.status === 'Shipped'
                                  ? '#e0f2fe'
                                  : '#fef3c7',
                              color:
                                order.status === 'Delivered'
                                  ? '#15803d'
                                  : order.status === 'Shipped'
                                  ? '#0369a1'
                                  : '#b45309',
                              fontWeight: 600
                            }}
                          >
                            {order.status}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Calendar size={14} />
                          {new Date(order.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>

                      {/* Status Update Control */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Dispatch Status:</span>
                        <select
                          value={order.status}
                          onChange={(e) => {
                            updateOrderStatus(order.id, e.target.value);
                            if (addToast) addToast(`Order ${order.id} updated to ${e.target.value}`);
                          }}
                          style={{
                            padding: '0.45rem 0.8rem',
                            borderRadius: '6px',
                            border: '1px solid var(--color-border)',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            background: '#faf8f5',
                            cursor: 'pointer'
                          }}
                        >
                          <option value="Pending">Pending Authentication</option>
                          <option value="Processing">Processing & Quality Polish</option>
                          <option value="Shipped">Shipped with Insured Courier</option>
                          <option value="Delivered">Delivered & Verified</option>
                        </select>
                      </div>
                    </div>

                    {/* Order Middle Grid: Customer & Delivery Info with Phone Number */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '1.5rem',
                        margin: '1.2rem 0'
                      }}
                    >
                      {/* Customer Details */}
                      <div style={{ background: '#faf9f7', padding: '1rem 1.2rem', borderRadius: '8px' }}>
                        <strong style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#8c734b', letterSpacing: '0.8px' }}>
                          Customer Contact
                        </strong>
                        <div style={{ marginTop: '0.4rem', fontSize: '0.9rem' }}>
                          <div style={{ fontWeight: 600 }}>{order.user?.name || order.address?.name}</div>
                          <div style={{ color: 'var(--color-text-muted)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                            <Mail size={13} /> {order.user?.email || 'N/A'}
                          </div>
                          {/* PHONE NUMBER PROMINENTLY DISPLAYED */}
                          <div style={{ color: '#111', fontWeight: 600, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.35rem', background: '#fff', padding: '0.35rem 0.6rem', borderRadius: '4px', border: '1px solid #eae5dc' }}>
                            <Phone size={14} color="#c5a97d" />
                            <span>Phone: {phoneDisplay}</span>
                          </div>
                        </div>
                      </div>

                      {/* Delivery Address Details */}
                      <div style={{ background: '#faf9f7', padding: '1rem 1.2rem', borderRadius: '8px' }}>
                        <strong style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#8c734b', letterSpacing: '0.8px' }}>
                          Insured Destination
                        </strong>
                        <div style={{ marginTop: '0.4rem', fontSize: '0.85rem' }}>
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                            <MapPin size={14} color="#c5a97d" style={{ marginTop: '2px', flexShrink: 0 }} />
                            <span>
                              {order.address?.street}, {order.address?.city} {order.address?.zip}
                            </span>
                          </div>
                          {order.address?.deliveryNotes && (
                            <div style={{ fontSize: '0.78rem', color: '#8c734b', marginTop: '0.4rem', fontStyle: 'italic' }}>
                              Note: "{order.address.deliveryNotes}"
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Ordered Items */}
                    <div style={{ borderTop: '1px solid #f0ede7', paddingTop: '1rem' }}>
                      <strong style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#8c734b', letterSpacing: '0.8px' }}>
                        Ordered Creations ({order.items?.length || 0})
                      </strong>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                        {order.items?.map((item, idx) => (
                          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.88rem' }}>
                            <span>
                              {item.name} <span style={{ color: 'var(--color-text-muted)' }}>× {item.quantity}</span>
                            </span>
                            <span style={{ fontWeight: 600 }}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                          </div>
                        ))}
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginTop: '0.8rem',
                          paddingTop: '0.6rem',
                          borderTop: '1px dashed #e8e3da',
                          fontSize: '1rem',
                          fontWeight: 'bold'
                        }}
                      >
                        <span>Total Paid:</span>
                        <span style={{ color: 'var(--color-obsidian)' }}>₹{order.total.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* TAB 2: MANAGE INVENTORY */}
      {activeTab === 'products' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {/* Add Product Form */}
          <div className="glass-card" style={{ padding: '2rem', background: '#fff', height: 'fit-content' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.2rem' }}>
              <PlusCircle size={20} color="#c5a97d" />
              <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Add New Creation</h3>
            </div>

            <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>Creation Title *</label>
                <input
                  placeholder="e.g. Royal Emerald Pendant"
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '6px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>Price (₹) *</label>
                  <input
                    type="number"
                    placeholder="3500"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '6px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>Stock Units *</label>
                  <input
                    type="number"
                    placeholder="5"
                    required
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '6px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>Description *</label>
                <textarea
                  placeholder="Romantic story and design inspiration"
                  rows={3}
                  required
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '6px', fontFamily: 'inherit' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>Gemstone & Metal Specs *</label>
                <input
                  placeholder="e.g. Diamond: 1.5ct, 18k Yellow Gold"
                  required
                  value={newProduct.details}
                  onChange={(e) => setNewProduct({ ...newProduct, details: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '6px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>Upload Creation Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--color-border)', borderRadius: '6px', fontSize: '0.85rem' }}
                />
                {newProduct.image && (
                  <div style={{ width: '80px', height: '80px', borderRadius: '6px', overflow: 'hidden', marginTop: '0.5rem', border: '1px solid var(--color-border)' }}>
                    <img src={newProduct.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
              </div>

              <button type="submit" className="btn btn-shimmer-gold" style={{ marginTop: '0.5rem', padding: '0.85rem' }}>
                Publish Creation
              </button>
            </form>
          </div>

          {/* Current Inventory List */}
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.2rem' }}>Catalog Inventory ({products.length})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {products.map((p) => (
                <div
                  key={p.id}
                  className="glass-card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem 1.25rem',
                    background: '#fff'
                  }}
                >
                  <div style={{ width: '60px', height: '60px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #eee', flexShrink: 0 }}>
                    <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 600, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {p.name}
                    </h4>
                    <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                      ₹{p.price.toLocaleString('en-IN')} • Stock: {p.stock} units
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteProduct(p.id, p.name)}
                    style={{ color: '#c53030', padding: '0.4rem', cursor: 'pointer' }}
                    title="Remove product"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: USER DIRECTORY */}
      {activeTab === 'users' && (
        <div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.2rem' }}>Customer & Client Accounts</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.2rem' }}>
            {allUsers && allUsers.length === 0 ? (
              <p>No registered accounts.</p>
            ) : (
              allUsers.map((u) => (
                <div
                  key={u.id || u.email}
                  className="glass-card"
                  style={{ padding: '1.25rem', background: '#fff' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <strong style={{ fontSize: '0.95rem' }}>{u.name}</strong>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '20px',
                        background: u.isAdmin ? '#0d0d11' : '#faf8f5',
                        color: u.isAdmin ? '#dfca9e' : '#666',
                        fontWeight: 600,
                        border: '1px solid var(--color-border)'
                      }}
                    >
                      {u.isAdmin ? 'Atelier Admin' : 'VIP Client'}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>{u.email}</div>
                  {u.joinDate && (
                    <div style={{ fontSize: '0.74rem', color: '#999', marginTop: '0.5rem' }}>
                      Member since: {new Date(u.joinDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AdminDashboard;
