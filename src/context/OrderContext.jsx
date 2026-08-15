import React, { createContext, useState, useContext, useEffect } from 'react';

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('orders');
    if (saved) return JSON.parse(saved);
    // Mock initial orders
    return [
      {
        id: 'ORD-1001',
        user: { name: 'John Doe', email: 'john@example.com' },
        items: [{ name: 'The Solitaire Ring', quantity: 1, price: 2400 }],
        total: 2400,
        address: { name: 'John Doe', street: '123 Main St', city: 'New York', zip: '10001' },
        status: 'Processing',
        date: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 'ORD-1002',
        user: { name: 'Jane Smith', email: 'jane@example.com' },
        items: [{ name: 'Pearl Drop Earrings', quantity: 2, price: 1200 }],
        total: 2400,
        address: { name: 'Jane Smith', street: '456 Oak Ave', city: 'Los Angeles', zip: '90001' },
        status: 'Shipped',
        date: new Date(Date.now() - 172800000).toISOString()
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString(),
      status: 'Pending'
    };
    setOrders([newOrder, ...orders]);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
};
