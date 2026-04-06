import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import logo from '../assets/logo.png';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container section-py">
        <div className="responsive-grid md:responsive-grid-2 lg:grid-cols-4 footer-grid text-center">
          
          {/* Brand Section */}
          <div className="footer-section flex flex-col items-center">
            <Link to="/" className="footer-brand mb-6">
              <img 
                src={logo} 
                alt="Vishwakarma Collections" 
                className="logo-footer"
              />
            </Link>
            <p className="italic text-center mb-8" style={{ maxWidth: '100%', wordWrap: 'break-word' }}>
              {t('footer.brand_p')}
            </p>
            <div className="social-icons flex gap-4">
              <a href="#" className="social-icon"><Instagram size={20} /></a>
              <a href="#" className="social-icon"><Facebook size={20} /></a>
              <a href="#" className="social-icon"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="mb-6">{t('footer.quick_links')}</h4>
            <ul className="footer-links space-y-3">
              <li><Link to="/" className="footer-link">{t('footer.about_heritage')}</Link></li>
              <li><Link to="/" className="footer-link">{t('footer.about_craft')}</Link></li>
              <li><Link to="/" className="footer-link">{t('footer.custom_orders')}</Link></li>
              <li><Link to="/" className="footer-link">{t('footer.care_guide')}</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div className="footer-section">
            <h4 className="mb-6">{t('footer.policies')}</h4>
            <ul className="footer-links space-y-3">
              <li><Link to="/" className="footer-link">{t('footer.shipping')}</Link></li>
              <li><Link to="/" className="footer-link">{t('footer.privacy')}</Link></li>
              <li><Link to="/" className="footer-link">{t('footer.terms')}</Link></li>
              <li><Link to="/" className="footer-link">{t('footer.authenticity')}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="mb-6">{t('footer.contact_us')}</h4>
            <ul className="footer-links space-y-4">
              <li className="flex flex-col items-center gap-2">
                <MapPin size={20} className="text-royal-maroon" />
                <span className="text-sm">{t('contact.address_1')}</span>
              </li>
              <li className="flex flex-col items-center gap-2">
                <MapPin size={20} className="text-royal-maroon" />
                <span className="text-sm">{t('contact.address_2')}</span>
              </li>
              <li className="flex flex-col items-center gap-2">
                <Phone size={20} className="text-royal-maroon" />
                <span className="text-sm">+91 8305162007, +91 9549453212</span>
              </li>
              <li className="flex flex-col items-center gap-2">
                <Mail size={20} className="text-royal-maroon" />
                <span className="text-sm" style={{ wordBreak: 'break-all', maxWidth: '100%' }}>ajayvishwakarma2k21@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom mt-16 pt-8 border-t border-antique-gold/20 text-center">
          <p>© {new Date().getFullYear()} {t('common.brand_name')}. {t('footer.jaipur_pride')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
