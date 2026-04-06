import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { User, LogIn, LogOut, Menu, X, ShieldCheck, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo3d from '../assets/logo-3d.png';

const Navbar = () => {
  const { currentUser, signInWithGoogle, logOut } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        {/* Left: 3D Round Golden Logo */}
        <div className="nav-brand">
          <Link to="/">
            <motion.img 
              src={logo3d} 
              alt="Vishwakarma Collections" 
              className="logo-navbar"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            />
          </Link>
        </div>

        {/* Center: Home & Language (Desktop Only via CSS) */}
        <div className="nav-links">
          <Link
            to="/"
            className={`nav-link heritage ${location.pathname === '/' ? 'active' : ''}`}
          >
            {t('common.heritage')}
          </Link>

          <button 
            onClick={toggleLanguage}
            className="lang-switch-3d"
          >
            <Languages size={18} className="text-royal-maroon" />
            <span className="font-bold">{language === 'en' ? '🌐 हिंदी' : '🌐 English'}</span>
          </button>
        </div>

        {/* Right Actions: Entry/Exit & Admin */}
        <div className="nav-actions">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 bg-white/30 rounded-xl backdrop-blur-md border border-white/20">
                <User size={18} className="text-royal-maroon" />
                <span className="text-sm font-bold text-royal-maroon btn-label-responsive" style={{ fontFamily: 'Marcellus, serif' }}>
                  {currentUser.displayName?.split(' ')[0] || 'Member'}
                </span>
              </div>
              
              <button 
                onClick={logOut} 
                className="btn-maroon-3d"
                title={t('common.logout')}
                style={{ background: 'var(--error-color)' }}
              >
                <LogOut size={18} />
                <span className="btn-label-responsive">{t('common.logout')}</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button onClick={handleLogin} className="btn-maroon-3d">
                <LogIn size={18} />
                <span className="btn-label-responsive">{t('common.entrance')}</span>
              </button>
              
              <Link to="/admin-login">
                <button className="btn-gold-3d">
                  <ShieldCheck size={18} />
                  <span className="btn-label-responsive">{t('common.admin')}</span>
                </button>
              </Link>
            </div>
          )}

          {/* Mobile menu trigger */}
          <button 
            className="hamburger-3d" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mobile-nav-menu"
          >
            <Link
              to="/"
              className="nav-link heritage text-center py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('common.heritage')}
            </Link>
            
            <button 
              onClick={() => { toggleLanguage(); setIsMobileMenuOpen(false); }}
              className="lang-switch-3d justify-center py-2"
            >
              <Languages size={18} />
              <span>{language === 'en' ? 'हिंदी में बदलें' : 'English'}</span>
            </button>

            <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
              {currentUser ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-center gap-3 p-3 bg-white/50 rounded-lg">
                    <User size={20} className="text-antique-gold" />
                    <span className="font-bold">{currentUser.displayName || currentUser.email}</span>
                  </div>
                  <button onClick={() => { logOut(); setIsMobileMenuOpen(false); }} className="btn-maroon-3d justify-center w-full" style={{ background: 'var(--error-color)' }}>
                    <LogOut size={18} />
                    <span>{t('common.logout')}</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <button onClick={() => { handleLogin(); setIsMobileMenuOpen(false); }} className="btn-maroon-3d justify-center w-full">
                    <LogIn size={18} />
                    <span>{t('common.entrance')}</span>
                  </button>
                  <Link to="/admin-login" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="btn-gold-3d w-full justify-center">
                      <ShieldCheck size={18} />
                      <span>{t('common.admin')}</span>
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
