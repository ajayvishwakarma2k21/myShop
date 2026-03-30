import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, signInWithGoogle, logOut } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Secure ID and Pass (configured per user instructions)
  const ADMIN_ID = 'admin';
  const ADMIN_PASS = 'admin123';

  useEffect(() => {
    // Check if admin is currently stored in local logic
    const adminState = localStorage.getItem('isAdminLocal');
    if (adminState === 'true') {
      setIsAdmin(true);
      setCurrentUser({ email: 'admin@vibeshop.com', displayName: 'Store Admin', photoURL: '' });
      setLoading(false);
    }
    
    // We can still establish the listener for standard users.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Only process firebase user if not in admin mode
      if (localStorage.getItem('isAdminLocal') !== 'true') {
        setCurrentUser(user);
        setIsAdmin(false);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const loginAdmin = (id, password) => {
    if (id === ADMIN_ID && password === ADMIN_PASS) {
      localStorage.setItem('isAdminLocal', 'true');
      setIsAdmin(true);
      setCurrentUser({ email: 'admin@vibeshop.com', displayName: 'Store Admin', photoURL: '' });
      return true;
    }
    return false;
  };

  const handleLogOut = async () => {
    if (isAdmin) {
      localStorage.removeItem('isAdminLocal');
      setIsAdmin(false);
      setCurrentUser(auth.currentUser);
      // Wait shortly for state prop before reload maybe? Not necessary usually.
    } else {
      await logOut();
    }
  };

  const value = {
    currentUser,
    isAdmin,
    loginAdmin,
    signInWithGoogle,
    logOut: handleLogOut
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
