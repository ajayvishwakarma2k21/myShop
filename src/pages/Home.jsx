import React from 'react';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import { PackageOpen, Sparkles } from 'lucide-react';
import heroImage from '../assets/hero.png';

const Home = () => {
  const { products, loading } = useData();
  const { t } = useLanguage();

  // Filter for general treasures (or items with no category yet)
  const generalProducts = products ? products.filter(p => !p.category || p.category === 'general') : [];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen" style={{ background: 'var(--bg-color)' }}>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-16 h-16 border-2 border-t-royal-maroon border-antique-gold rounded-full"
        ></motion.div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="container hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-4">
              <Sparkles className="text-antique-gold" size={32} />
            </div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              {t('hero.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              {t('hero.subtitle')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <button className="btn-primary" onClick={() => document.getElementById('products-section').scrollIntoView({ behavior: 'smooth' })}>
                {t('hero.explore_btn')}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Jali Spacer */}
      <div className="jali-spacer"></div>

      {/* Products Section */}
      <section id="products-section" className="container" style={{ paddingBottom: '6rem' }}>
        <div className="page-header">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('products.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('products.subtitle')}
          </motion.p>
        </div>
        
        {generalProducts && generalProducts.length > 0 ? (
          <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
            {generalProducts.map((product, idx) => (
              <motion.div
                key={product.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <PackageOpen className="empty-state-icon mx-auto" style={{ width: '4rem', height: '4rem', display: 'block', color: 'var(--antique-gold)' }} />
            <h3>{t('products.empty_title')}</h3>
            <p>{t('products.empty_p')}</p>
          </div>
        )}
      </section>

      {/* Jali Spacer */}
      <div className="jali-spacer"></div>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 style={{ fontSize: '2.5rem', fontFamily: 'Cinzel, serif', marginBottom: '1.5rem', border: 'none' }}>{t('contact.title')}</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
              {t('contact.p')}
            </p>
            <ul className="footer-links" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              <li className="mb-4"><strong>{t('contact.gallery')}:</strong> {t('contact.gallery_address')}</li>
              <li className="mb-4"><strong>{t('contact.phone')}:</strong> +91 141 234 5678</li>
              <li><strong>{t('contact.mail')}:</strong> heritage@rajputanajewels.com</li>
            </ul>
          </motion.div>

          <motion.form 
            className="contact-form"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <input type="text" placeholder={t('contact.name_placeholder')} className="contact-input" />
            <input type="email" placeholder={t('contact.email_placeholder')} className="contact-input" />
            <textarea placeholder={t('contact.message_placeholder')} className="contact-input" rows="5" style={{ resize: 'vertical' }}></textarea>
            <button type="submit" className="btn-primary w-full" style={{ background: 'var(--antique-gold)', color: 'var(--royal-maroon)', border: 'none', fontWeight: 600 }}>
              {t('contact.submit_btn')}
            </button>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default Home;
