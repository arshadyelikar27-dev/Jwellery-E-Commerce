import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { useOrders } from '../context/OrderContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const { user, allUsers, logout } = useAuth();
  const { products, addProduct, deleteProduct } = useProducts();
  const { orders, updateOrderStatus } = useOrders();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products');

  const [newProduct, setNewProduct] = useState({
    name: '', price: '', description: '', details: '', image: '/assets/product_ring.jpg', stock: ''
  });

  if (!user || !user.isAdmin) {
    return <div className="container py-8">Access Denied. Admins only.</div>;
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
      stock: Number(newProduct.stock),
    });
    setNewProduct({ name: '', price: '', description: '', details: '', image: '/assets/product_ring.jpg', stock: '' });
  };

  return (
    <motion.div className="container py-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={() => navigate(-1)} className="btn btn-outline" style={{ padding: '0.4rem 1rem' }}>&larr; Back</button>
          <h2 style={{ margin: 0 }}>Admin Dashboard</h2>
        </div>
        <button className="btn" onClick={handleLogout}>Logout</button>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--color-border)' }}>
        <button 
          onClick={() => setActiveTab('products')} 
          style={{ padding: '0.5rem 1rem', background: 'none', border: 'none', borderBottom: activeTab === 'products' ? '2px solid var(--color-accent)' : 'none', cursor: 'pointer', fontWeight: activeTab === 'products' ? 'bold' : 'normal', color: 'inherit' }}
        >
          Manage Products
        </button>
        <button 
          onClick={() => setActiveTab('orders')} 
          style={{ padding: '0.5rem 1rem', background: 'none', border: 'none', borderBottom: activeTab === 'orders' ? '2px solid var(--color-accent)' : 'none', cursor: 'pointer', fontWeight: activeTab === 'orders' ? 'bold' : 'normal', color: 'inherit' }}
        >
          Orders & Tracking
        </button>
        <button 
          onClick={() => setActiveTab('users')} 
          style={{ padding: '0.5rem 1rem', background: 'none', border: 'none', borderBottom: activeTab === 'users' ? '2px solid var(--color-accent)' : 'none', cursor: 'pointer', fontWeight: activeTab === 'users' ? 'bold' : 'normal', color: 'inherit' }}
        >
          Users Details
        </button>
      </div>

      {activeTab === 'products' && (
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px' }}>
            <h3>Add New Product</h3>
            <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <input placeholder="Product Name" required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} style={{ padding: '0.8rem', border: '1px solid var(--color-border)' }} />
              <input type="number" placeholder="Price" required value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} style={{ padding: '0.8rem', border: '1px solid var(--color-border)' }} />
              <textarea placeholder="Description" required value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} style={{ padding: '0.8rem', border: '1px solid var(--color-border)' }} />
              <textarea placeholder="Details/Specs" required value={newProduct.details} onChange={e => setNewProduct({...newProduct, details: e.target.value})} style={{ padding: '0.8rem', border: '1px solid var(--color-border)' }} />
              <input type="number" placeholder="Stock" required value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} style={{ padding: '0.8rem', border: '1px solid var(--color-border)' }} />
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', color: '#aaa' }}>Product Image:</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ padding: '0.8rem', border: '1px solid var(--color-border)' }} />
                {newProduct.image && (
                  <img src={newProduct.image} alt="Preview" style={{ height: '80px', width: '80px', objectFit: 'cover', borderRadius: '4px', marginTop: '0.5rem' }} />
                )}
              </div>

              <button type="submit" className="btn btn-primary">Add Product</button>
            </form>
          </div>

          <div style={{ flex: '2 1 500px' }}>
            <h3>Manage Products</h3>
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {products.map(p => (
                <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid var(--color-border)' }}>
                  <div>
                    <strong>{p.name}</strong> - ${p.price.toLocaleString()} (Stock: {p.stock})
                  </div>
                  <button className="btn" onClick={() => deleteProduct(p.id)} style={{ padding: '0.2rem 0.5rem', color: 'red' }}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div>
          <h3>Orders Details & Tracking</h3>
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {orders.length === 0 ? <p>No orders found.</p> : orders.map(order => (
              <div key={order.id} style={{ padding: '1.5rem', border: '1px solid var(--color-border)', borderRadius: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid #333', paddingBottom: '1rem' }}>
                  <div>
                    <strong>Order ID:</strong> {order.id} <br/>
                    <strong>Date:</strong> {new Date(order.date).toLocaleString()} <br/>
                    <strong>Customer:</strong> {order.user?.name} ({order.user?.email})
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <strong>Total:</strong> ${order.total.toLocaleString()} <br/>
                    <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <label>Status:</label>
                      <select 
                        value={order.status} 
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        style={{ padding: '0.3rem', background: 'var(--color-bg)', color: 'inherit', border: '1px solid var(--color-border)' }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div>
                  <strong>Items:</strong>
                  <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                    {order.items.map((item, idx) => (
                      <li key={idx}>{item.name} - Qty: {item.quantity} - ${item.price.toLocaleString()}</li>
                    ))}
                  </ul>
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <strong>Shipping Address:</strong> {order.address.street}, {order.address.city} {order.address.zip}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div>
          <h3>Users Details</h3>
          <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {allUsers && allUsers.length === 0 ? <p>No users found.</p> : allUsers.map(u => (
              <div key={u.id || u.email} style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '4px' }}>
                <strong>Name:</strong> {u.name} <br/>
                <strong>Email:</strong> {u.email} <br/>
                <strong>Role:</strong> {u.isAdmin ? 'Admin' : 'Customer'} <br/>
                {u.joinDate && <><small>Joined: {new Date(u.joinDate).toLocaleDateString()}</small></>}
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AdminDashboard;
