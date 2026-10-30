import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('blood_bank_token') || null);
  const [role, setRole] = useState(localStorage.getItem('blood_bank_role') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('blood_bank_token');
    const savedRole = localStorage.getItem('blood_bank_role');
    const savedUser = localStorage.getItem('blood_bank_user');

    if (savedToken && savedRole && savedUser) {
      try {
        setToken(savedToken);
        setRole(savedRole);
        setUser(JSON.parse(savedUser));
      } catch (e) {
        logout();
      }
    }
    setLoading(false);
  }, []);

  const loginDonor = (jwtToken, donorData) => {
    localStorage.setItem('blood_bank_token', jwtToken);
    localStorage.setItem('blood_bank_role', 'ROLE_DONOR');
    localStorage.setItem('blood_bank_user', JSON.stringify(donorData));
    setToken(jwtToken);
    setRole('ROLE_DONOR');
    setUser(donorData);
  };

  const loginAdmin = (jwtToken, username) => {
    const adminData = { username };
    localStorage.setItem('blood_bank_token', jwtToken);
    localStorage.setItem('blood_bank_role', 'ROLE_ADMIN');
    localStorage.setItem('blood_bank_user', JSON.stringify(adminData));
    setToken(jwtToken);
    setRole('ROLE_ADMIN');
    setUser(adminData);
  };

  const updateDonorUser = (updatedDonorData) => {
    localStorage.setItem('blood_bank_user', JSON.stringify(updatedDonorData));
    setUser(updatedDonorData);
  };

  const logout = () => {
    localStorage.removeItem('blood_bank_token');
    localStorage.removeItem('blood_bank_role');
    localStorage.removeItem('blood_bank_user');
    setToken(null);
    setRole(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    role,
    loading,
    isAuthenticated: !!token,
    isDonor: role === 'ROLE_DONOR',
    isAdmin: role === 'ROLE_ADMIN',
    loginDonor,
    loginAdmin,
    updateDonorUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
