import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, User, LogIn, LogOut, Menu, X, ShieldCheck, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { currentUser, isAdmin, signInWithGoogle, logOut } = useAuth();
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

  const navLinks = [
    { name: t('common.heritage'), path: '/' },
  ];

  if (isAdmin) {
    navLinks.push({ name: t('common.admin_hub'), path: '/admin' });
  }

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="nav-brand">
          <Sparkles size={28} className="text-antique-gold" style={{ color: 'var(--antique-gold)' }} />
          <span>{t('common.brand_name')}</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-links flex items-center">
          <div className="flex gap-8 items-center mr-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-4" style={{ paddingLeft: '2rem', borderLeft: '1px solid var(--border-color)' }}>
            {/* Language Toggle */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full transition-all border border-antique-gold/30 hover:bg-antique-gold/10"
              style={{ fontFamily: 'Marcellus, serif', fontSize: '0.8rem', color: 'var(--royal-maroon)' }}
            >
              <Languages size={14} className="text-antique-gold" />
              <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
            </button>

            {currentUser ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <User size={20} className="text-antique-gold" style={{ color: 'var(--antique-gold)' }} />
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)', fontFamily: 'Marcellus, serif' }}>
                    {currentUser.displayName || currentUser.email.split('@')[0]}
                  </span>
                </div>
                <button onClick={logOut} className="btn-icon" title={t('common.logout')}>
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button onClick={handleLogin} className="btn-primary flex items-center gap-2" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
                  <LogIn size={16} />
                  <span>{t('common.entrance')}</span>
                </button>
                <Link to="/admin-login" className="btn-secondary flex items-center gap-2" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
                  <ShieldCheck size={16} />
                  <span>{t('common.admin')}</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <button 
          className="btn-icon mobile-menu-btn" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mobile-nav-menu"
            style={{ 
              position: 'absolute', top: '100%', left: 0, right: 0, 
              background: 'var(--surface-color)', padding: '1.5rem', 
              borderBottom: '2px solid var(--antique-gold)', 
              display: 'flex', flexDirection: 'column', gap: '1rem',
              boxShadow: 'var(--shadow-subtle)',
              zIndex: 90
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Mobile Language Toggle */}
            <button 
              onClick={() => { toggleLanguage(); setIsMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-2 w-full p-3 rounded-md border border-antique-gold/30 bg-antique-gold/5"
              style={{ fontFamily: 'Marcellus, serif', color: 'var(--royal-maroon)' }}
            >
              <Languages size={18} />
              <span>{language === 'en' ? 'हिंदी में बदलें' : 'Switch to English'}</span>
            </button>

            <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
              {currentUser ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <User size={20} className="text-antique-gold" style={{ color: 'var(--antique-gold)' }} />
                    <span style={{ fontFamily: 'Marcellus, serif' }}>{currentUser.displayName || currentUser.email}</span>
                  </div>
                  <button onClick={() => { logOut(); setIsMobileMenuOpen(false); }} className="btn-icon" style={{ color: 'var(--error-color)' }}>
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <button onClick={() => { handleLogin(); setIsMobileMenuOpen(false); }} className="btn-primary w-full flex items-center justify-center gap-2">
                    <LogIn size={18} />
                    <span>{t('common.entrance')}</span>
                  </button>
                  <Link to="/admin-login" onClick={() => setIsMobileMenuOpen(false)} className="btn-secondary w-full flex items-center justify-center gap-2">
                    <ShieldCheck size={18} />
                    <span>{t('common.admin')}</span>
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
