import React from 'react';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Scissor, Sparkles, Star, Clock, CheckCircle2 } from 'lucide-react';

const Parlour = () => {
  const { products, loading } = useData();
  const { t } = useLanguage();

  // Filter only parlour services
  const parlourServices = products.filter(item => item.category === 'parlour');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="parlour-page">
      {/* Hero Section */}
      <section className="hero-section relative py-20 bg-royal-maroon text-white overflow-hidden" style={{ background: 'var(--royal-maroon)', textAlign: 'center' }}>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-antique-gold blur-[100px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-antique-gold blur-[100px]"></div>
        </div>
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="flex items-center justify-center gap-2 mb-4 text-antique-gold font-medium uppercase tracking-[0.3em]" style={{ color: 'var(--antique-gold)', fontFamily: 'Cinzel, serif' }}>
              <Sparkles size={20} />
              Divine Elegance
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'Cinzel, serif' }}>Royal Beauty Shringar</h1>
            <p className="max-w-2xl mx-auto text-lg opacity-80" style={{ fontFamily: 'Marcellus, serif' }}>
              Experience the pinnacle of royal grooming and traditional beauty services tailored for modern royalty. 
              Our artisans use time-honored techniques passed down through generations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-[#faf9f6]">
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-royal-maroon mb-2" style={{ fontFamily: 'Cinzel, serif', color: 'var(--royal-maroon)' }}>Exquisite Services</h2>
              <div className="h-1 w-20 bg-antique-gold"></div>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-antique-gold"></div>
              <p className="text-gray-500 font-medium" style={{ fontFamily: 'Marcellus, serif' }}>Unveiling our services...</p>
            </div>
          ) : parlourServices.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {parlourServices.map((service) => (
                <motion.div 
                  key={service.id} 
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group border border-gray-100"
                  variants={itemVariants}
                >
                  <div className="relative h-72 overflow-hidden">
                    <img 
                      src={service.imageUrl} 
                      alt={service.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-1 rounded-full shadow-lg">
                      <span className="font-bold text-royal-maroon" style={{ color: 'var(--royal-maroon)' }}>₹{Number(service.price).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-antique-gold transition-colors" style={{ fontFamily: 'Cinzel, serif' }}>{service.name}</h3>
                    <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed" style={{ fontFamily: 'Marcellus, serif' }}>
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Star size={16} className="text-antique-gold fill-antique-gold" />
                        <span className="font-medium">Premium Service</span>
                      </div>
                      <button className="text-antique-gold font-bold flex items-center gap-2 hover:gap-3 transition-all" style={{ color: 'var(--antique-gold)' }}>
                        Book Now <Sparkles size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
              <Scissor size={60} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-400 mb-2" style={{ fontFamily: 'Cinzel, serif' }}>No Services Listed</h3>
              <p className="text-gray-500" style={{ fontFamily: 'Marcellus, serif' }}>Check back soon for our royal beauty offerings.</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="About our parlour" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-[-30px] left-[-30px] w-64 h-64 bg-antique-gold rounded-full opacity-10 blur-3xl"></div>
              <div className="absolute bottom-[-30px] right-[-30px] w-64 h-64 bg-royal-maroon rounded-full opacity-10 blur-3xl"></div>
            </div>
            
            <div>
              <h2 className="text-4xl font-bold text-royal-maroon mb-6" style={{ fontFamily: 'Cinzel, serif', color: 'var(--royal-maroon)' }}>Why Royal Shringar?</h2>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed" style={{ fontFamily: 'Marcellus, serif' }}>
                We believe beauty is an inheritance. Our parlour combine the luxury of royal courts 
                with modern expertise to provide an unparalleled experience.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Expert Artisans", desc: "Specialists trained in traditional Rajasthani and modern techniques." },
                  { title: "Premium Products", desc: "We use only the finest, naturally sourced and luxury brand products." },
                  { title: "Royal Ambiance", desc: "Step into a space designed to make you feel like royalty from the moment you enter." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-antique-gold/10 flex items-center justify-center text-antique-gold">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-1" style={{ fontFamily: 'Cinzel, serif' }}>{item.title}</h4>
                      <p className="text-gray-500" style={{ fontFamily: 'Marcellus, serif' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-royal-maroon text-white text-center relative overflow-hidden" style={{ background: 'var(--royal-maroon)' }}>
        <div className="container relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-8" style={{ fontFamily: 'Cinzel, serif' }}>Reserve Your Royal Experience</h2>
          <button className="px-10 py-4 bg-antique-gold text-white font-bold rounded-full hover:bg-white hover:text-royal-maroon transition-all shadow-lg hover:shadow-gold" style={{ background: 'var(--antique-gold)', fontFamily: 'Cinzel, serif' }}>
            Book Your Appointment
          </button>
        </div>
      </section>
    </div>
  );
};

export default Parlour;
