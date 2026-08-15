import React, { createContext, useState, useContext, useEffect } from 'react';

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('orders');
    if (saved) return JSON.parse(saved);
    // Initial luxury orders with phone numbers
    return [
      {
        id: 'ORD-1001',
        user: { name: 'Eleanor Vance', email: 'eleanor.vance@luxury.com' },
        items: [{ name: 'The Solitaire Ring', quantity: 1, price: 2400, image: '/assets/product_ring.jpg' }],
        total: 2400,
        address: {
          name: 'Eleanor Vance',
          phone: '9876543210',
          countryCode: '+91',
          formattedPhone: '+91 98765 43210',
          street: '123 Luxury Ave, Penthouse 4',
          city: 'Mumbai',
          zip: '400001'
        },
        status: 'Processing',
        date: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 'ORD-1002',
        user: { name: 'Julian Hayes', email: 'julian@haute-paris.com' },
        items: [{ name: 'Pearl Drop Earrings', quantity: 2, price: 1200, image: '/assets/product_earrings.jpg' }],
        total: 2400,
        address: {
          name: 'Julian Hayes',
          phone: '9123456789',
          countryCode: '+91',
          formattedPhone: '+91 91234 56789',
          street: '456 Fifth Avenue, Suite 10',
          city: 'New Delhi',
          zip: '110001'
        },
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
