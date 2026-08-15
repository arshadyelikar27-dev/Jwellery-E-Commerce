import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [allUsers, setAllUsers] = useState(() => {
    const saved = localStorage.getItem('allUsers');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, name: 'Admin', email: 'admin@example.com', isAdmin: true, joinDate: new Date().toISOString() },
      { id: 2, name: 'John Doe', email: 'john@example.com', isAdmin: false, joinDate: new Date().toISOString() }
    ];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('allUsers', JSON.stringify(allUsers));
  }, [allUsers]);

  const login = (email, password) => {
    // Admin detection logic
    if (email === 'admin@example.com' && password === 'admin123') {
      const adminUser = { email, isAdmin: true, name: 'Admin' };
      setUser(adminUser);
      return { success: true, isAdmin: true };
    }
    
    // Normal user logic (mock)
    if (email && password) {
      const normalUser = allUsers.find(u => u.email === email) || { email, isAdmin: false, name: email.split('@')[0] };
      setUser(normalUser);
      return { success: true, isAdmin: false };
    }

    return { success: false, message: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
  };

  const register = (email, password, name) => {
    const newUser = { id: Date.now(), email, isAdmin: false, name, joinDate: new Date().toISOString() };
    setAllUsers([...allUsers, newUser]);
    setUser(newUser);
    return { success: true };
  }

  return (
    <AuthContext.Provider value={{ user, allUsers, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
