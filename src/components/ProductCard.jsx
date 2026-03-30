import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const ProductCard = ({ product }) => {
  const { t } = useLanguage();
  
  return (
    <motion.div 
      className="product-card"
    >
      <div className="product-img-wrapper">
        <img 
          src={product.imageUrl || "https://images.unsplash.com/photo-1616154674722-1d54674722bb?w=800&q=80"} 
          alt={product.name} 
          className="product-img"
          loading="lazy"
        />
      </div>
      <div className="product-content">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <div className="flex flex-col gap-4 items-center">
          <span className="product-price">₹{Number(product.price).toLocaleString('en-IN')}</span>
          <button className="btn-primary w-full" style={{ padding: '0.6rem' }}>
            {t('products.view_btn')}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
