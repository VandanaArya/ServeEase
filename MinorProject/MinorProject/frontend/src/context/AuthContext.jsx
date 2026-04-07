import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('serveEase_user');
    const storedToken = localStorage.getItem('serveEase_token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('serveEase_user', JSON.stringify(userData));
    localStorage.setItem('serveEase_token', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('serveEase_user');
    localStorage.removeItem('serveEase_token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
