import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        <div className="grid footer-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem' }}>
          
          {/* Brand Section */}
          <div className="footer-section">
            <Link to="/" className="footer-brand">
              <Sparkles className="inline-block mr-2" />
              {t('common.brand_name')}
            </Link>
            <p style={{ marginBottom: '2rem', fontStyle: 'italic' }}>
              {t('footer.brand_p')}
            </p>
            <div className="social-icons">
              <a href="#" className="social-icon"><Instagram size={20} /></a>
              <a href="#" className="social-icon"><Facebook size={20} /></a>
              <a href="#" className="social-icon"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>{t('footer.quick_links')}</h4>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">{t('footer.about_heritage')}</Link></li>
              <li><Link to="/" className="footer-link">{t('footer.about_craft')}</Link></li>
              <li><Link to="/" className="footer-link">{t('footer.custom_orders')}</Link></li>
              <li><Link to="/" className="footer-link">{t('footer.care_guide')}</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div className="footer-section">
            <h4>{t('footer.policies')}</h4>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">{t('footer.shipping')}</Link></li>
              <li><Link to="/" className="footer-link">{t('footer.privacy')}</Link></li>
              <li><Link to="/" className="footer-link">{t('footer.terms')}</Link></li>
              <li><Link to="/" className="footer-link">{t('footer.authenticity')}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4>{t('footer.contact_us')}</h4>
            <ul className="footer-links">
              <li className="flex items-start gap-3 mb-4">
                <MapPin size={20} className="text-royal-maroon shrink-0" />
                <span className="text-sm">{t('contact.gallery_address')}</span>
              </li>
              <li className="flex items-center gap-3 mb-4">
                <Phone size={20} className="text-royal-maroon shrink-0" />
                <span className="text-sm">+91 141 234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-royal-maroon shrink-0" />
                <span className="text-sm">royal@rajputanajewels.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {t('common.brand_name')}. {t('footer.jaipur_pride')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
