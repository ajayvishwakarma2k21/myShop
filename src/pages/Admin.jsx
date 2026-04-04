import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { PlusCircle, List, UploadCloud, Trash2, LayoutDashboard, Search, Gem, History } from 'lucide-react';
import { motion } from 'framer-motion';

const Admin = () => {
  const { products, addProduct, deleteProduct, loading } = useData();
  const [activeTab, setActiveTab] = useState('inventory');
  
  // Form State
  const [formData, setFormData] = useState({ name: '', price: '', description: '', category: 'general' });
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;
    
    alert(`Enshrining "${formData.name}" into the vault as a ${formData.category.toUpperCase()} item...`);
    console.log('Submitting new post with category:', formData.category);
    setIsSubmitting(true);
    await addProduct(formData, imageFile);
    setFormData({ name: '', price: '', description: '', category: 'general' });
    setImageFile(null);
    setIsSubmitting(false);
    setActiveTab('inventory');
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <div className="page-header" style={{ textAlign: 'left', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontFamily: 'Cinzel, serif', color: 'var(--royal-maroon)' }}>Royal Treasury</h1>
        <p style={{ fontFamily: 'Marcellus, serif' }}>Manage your exquisite heritage collection and store settings</p>
      </div>

      <div className="admin-layout animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem' }}>
        {/* Sidebar */}
        <aside className="admin-sidebar" style={{ background: 'var(--royal-maroon)', borderRadius: 'var(--radius-lg)', padding: '2rem 1.5rem', height: 'fit-content', color: 'white', border: '1px solid var(--antique-gold)' }}>
          <div className="flex flex-col gap-2">
            <button 
              className={`flex items-center gap-3 w-full p-4 rounded-md transition-all ${activeTab === 'inventory' ? 'bg-antique-gold text-white shadow-gold' : 'hover:bg-white/10'}`}
              onClick={() => setActiveTab('inventory')}
              style={{ textAlign: 'left', background: activeTab === 'inventory' ? 'var(--antique-gold)' : 'transparent', border: 'none', cursor: 'pointer', color: 'white', fontFamily: 'Marcellus, serif' }}
            >
              <Gem size={20} />
              The Vault
            </button>
            <button 
              className={`flex items-center gap-3 w-full p-4 rounded-md transition-all ${activeTab === 'add' ? 'bg-antique-gold text-white shadow-gold' : 'hover:bg-white/10'}`}
              onClick={() => setActiveTab('add')}
              style={{ textAlign: 'left', background: activeTab === 'add' ? 'var(--antique-gold)' : 'transparent', border: 'none', cursor: 'pointer', color: 'white', fontFamily: 'Marcellus, serif' }}
            >
              <PlusCircle size={20} />
              Add New post
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <main className="admin-content glass-card" style={{ padding: '2.5rem', background: 'white' }}>
          {activeTab === 'inventory' && (
            <div>
              <div className="flex justify-between items-center" style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', margin: 0, fontFamily: 'Cinzel, serif', border: 'none' }}>The Collection</h2>
                <div style={{ position: 'relative' }}>
                  <Search size={18} style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                  <input 
                    type="text" 
                    placeholder="Search treasures..." 
                    className="input-field" 
                    style={{ paddingLeft: '2.5rem', width: '300px', borderRadius: '2rem' }}
                  />
                </div>
              </div>

              {loading ? (
                <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-secondary)', fontFamily: 'Marcellus, serif' }}>Accessing the vault...</div>
              ) : products.length > 0 ? (
                <div className="data-table-wrapper" style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--antique-gold)', background: 'rgba(212, 175, 55, 0.05)' }}>
                        <th style={{ padding: '1.25rem', fontFamily: 'Cinzel, serif', fontSize: '0.8rem', letterSpacing: '0.1em' }}>TREASURE / SERVICE</th>
                        <th style={{ padding: '1.25rem', fontFamily: 'Cinzel, serif', fontSize: '0.8rem', letterSpacing: '0.1em' }}>CATEGORY</th>
                        <th style={{ padding: '1.25rem', fontFamily: 'Cinzel, serif', fontSize: '0.8rem', letterSpacing: '0.1em' }}>VALUATION</th>
                        <th style={{ padding: '1.25rem', fontFamily: 'Cinzel, serif', fontSize: '0.8rem', letterSpacing: '0.1em' }}>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => (
                        <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
                          <td style={{ padding: '1.25rem' }}>
                            <div className="flex items-center gap-4">
                              <img 
                                src={product.imageUrl || "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80"} 
                                alt={product.name}
                                style={{ width: '60px', height: '60px', borderRadius: '4px', objectFit: 'cover', border: '1px solid var(--antique-gold)' }}
                              />
                              <div>
                                <div style={{ fontWeight: 600, color: 'var(--royal-maroon)', fontFamily: 'Cinzel, serif' }}>{product.name}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                  {product.description}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: '1.25rem' }}>
                            <span style={{ 
                              padding: '0.25rem 0.75rem', 
                              borderRadius: '1rem', 
                              fontSize: '0.75rem', 
                              fontWeight: 600,
                              textTransform: 'uppercase',
                              background: product.category === 'parlour' ? 'rgba(255, 105, 180, 0.1)' : 'rgba(212, 175, 55, 0.1)',
                              color: product.category === 'parlour' ? '#ff1493' : 'var(--antique-gold)',
                              border: `1px solid ${product.category === 'parlour' ? '#ff69b4' : 'var(--antique-gold)'}`
                            }}>
                              {product.category || 'general'}
                            </span>
                          </td>
                          <td style={{ padding: '1.25rem', fontWeight: 600, fontFamily: 'Marcellus, serif', fontSize: '1.1rem' }}>₹{Number(product.price).toLocaleString('en-IN')}</td>
                          <td style={{ padding: '1.25rem' }}>
                            <button 
                              className="btn-icon danger" 
                              title="Remove from Treasury"
                              onClick={() => {
                                if (window.confirm("Are you certain this treasure should be removed from the vault?")) {
                                  deleteProduct(product.id);
                                }
                              }}
                              style={{ color: 'var(--error-color)', padding: '0.5rem', borderRadius: '4px', border: '1px solid #fecaca' }}
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="empty-state">
                  <Gem size={48} className="mx-auto" style={{ color: 'var(--antique-gold)', opacity: 0.5, marginBottom: '1rem' }} />
                  <h3 style={{ fontFamily: 'Cinzel, serif' }}>The collection is empty</h3>
                  <p style={{ fontFamily: 'Marcellus, serif' }}>Start adding your finest masterpieces to the treasury.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'add' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem', fontFamily: 'Cinzel, serif', border: 'none' }}>Create New Post</h2>
              
              <form onSubmit={handleSubmit} className="flex-col gap-6" style={{ maxWidth: '700px' }}>
                <div className="form-group" style={{ marginBottom: '2rem' }}>
                  <label className="form-label" style={{ fontWeight: 600, marginBottom: '1rem', display: 'block', color: 'var(--royal-maroon)', fontFamily: 'Marcellus, serif' }}>
                    What are you adding to the collection?
                  </label>
                  <div className="flex gap-4 p-1 bg-gray-100 rounded-xl border border-gray-200" style={{ marginBottom: '1rem' }}>
                    <button 
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, category: 'general' }))}
                      style={{ 
                        flex: 1, padding: '1rem', borderRadius: '10px', border: 'none', cursor: 'pointer',
                        background: formData.category === 'general' ? 'var(--royal-maroon)' : 'transparent',
                        color: formData.category === 'general' ? 'white' : 'var(--text-secondary)',
                        fontWeight: 600, transition: 'all 0.3s',
                        boxShadow: formData.category === 'general' ? '0 4px 15px rgba(61, 12, 12, 0.2)' : 'none'
                      }}
                    >
                      Jewelry Treasure
                    </button>
                    <button 
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, category: 'parlour' }))}
                      style={{ 
                        flex: 1, padding: '1rem', borderRadius: '10px', border: 'none', cursor: 'pointer',
                        background: formData.category === 'parlour' ? 'var(--royal-maroon)' : 'transparent',
                        color: formData.category === 'parlour' ? 'white' : 'var(--text-secondary)',
                        fontWeight: 600, transition: 'all 0.3s',
                        boxShadow: formData.category === 'parlour' ? '0 4px 15px rgba(61, 12, 12, 0.2)' : 'none'
                      }}
                    >
                      Parlour Service
                    </button>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                    Currently selected: <strong style={{ color: 'var(--royal-maroon)' }}>{formData.category === 'parlour' ? 'Beauty Parlour Service' : 'General Jewelry Item'}</strong>
                  </p>
                </div>
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label" style={{ fontWeight: 600, marginBottom: '0.5rem', display: 'block', color: 'var(--royal-maroon)', fontFamily: 'Marcellus, serif' }}>
                    {formData.category === 'parlour' ? 'Service Name' : 'Item Name'}
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder={formData.category === 'parlour' ? "e.g. Bridal Makeup" : "e.g. Maharani Polki Necklace"}
                    required
                  />
                </div>
                
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label" style={{ fontWeight: 600, marginBottom: '0.5rem', display: 'block', color: 'var(--royal-maroon)', fontFamily: 'Marcellus, serif' }}>Valuation (₹)</label>
                  <input 
                    type="number" 
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="50,000"
                    min="0"
                    required
                  />
                </div>
                
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label" style={{ fontWeight: 600, marginBottom: '0.5rem', display: 'block', color: 'var(--royal-maroon)', fontFamily: 'Marcellus, serif' }}>
                    {formData.category === 'parlour' ? 'Service Details' : 'Provenance & Details'}
                  </label>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder={formData.category === 'parlour' ? "Describe the service, products used, and styling tips..." : "Describe the craftsmanship and history..."}
                    rows="5"
                    style={{ resize: 'vertical' }}
                    required
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '2rem' }}>
                  <label className="form-label" style={{ fontWeight: 600, marginBottom: '0.5rem', display: 'block', color: 'var(--royal-maroon)', fontFamily: 'Marcellus, serif' }}>Visual Representation</label>
                  <label className="file-upload w-full flex flex-col items-center justify-center" style={{ border: '2px dashed var(--antique-gold)', borderRadius: '8px', padding: '3rem', cursor: 'pointer', background: 'rgba(212, 175, 55, 0.05)' }}>
                    <UploadCloud className="file-upload-icon" style={{ color: 'var(--antique-gold)', marginBottom: '1rem' }} />
                    <span style={{ color: 'var(--text-primary)', fontWeight: 500, fontFamily: 'Marcellus, serif' }}>
                      {imageFile ? imageFile.name : `Upload ${formData.category === 'parlour' ? 'service' : 'treasure'} visual`}
                    </span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>

                <div className="flex gap-4">
                  <button type="button" className="btn-secondary" onClick={() => setActiveTab('inventory')} style={{ flex: 1 }}>
                    Return
                  </button>
                   <button type="submit" className="btn-primary flex items-center gap-2 justify-center" disabled={isSubmitting} style={{ flex: 2 }}>
                    {isSubmitting ? 'Recording...' : (
                      <>
                        <PlusCircle size={18} />
                        {formData.category === 'parlour' ? 'Add Service' : 'Enshrine Treasure'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;
