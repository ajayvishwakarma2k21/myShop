import React, { createContext, useContext, useEffect, useState } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

// Set your backend API URL here using Vite environment variables
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/products';

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        
        // MongoDB uses _id, let's map it to id for frontend compatibility
        const formattedData = data.map(item => ({
          ...item,
          id: item._id
        }));
        setProducts(formattedData);
      } catch (error) {
        console.error("Error fetching data from API", error);
        // Fallback or handle error
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addProduct = async (productData, imageFile) => {
    try {
      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('description', productData.description);
      formData.append('price', productData.price);
      
      if (imageFile) {
        formData.append('image', imageFile);
      } else if (productData.imageUrl) {
        // Fallback for mock/placeholder URL if no file is chosen
        formData.append('imageUrl', productData.imageUrl);
      }

      const response = await fetch(API_URL, {
        method: 'POST',
        // Note: When using FormData with fetch, omit the Content-Type header. 
        // The browser will automatically set it with the correct boundary.
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const newProduct = await response.json();
      
      // Update local state
      setProducts(prev => [{...newProduct, id: newProduct._id}, ...prev]);
      return true;
    } catch (error) {
      console.error("Error adding product: ", error);
      return false;
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      setProducts(prev => prev.filter(p => p.id !== id));
      return true;
    } catch (error) {
      console.error("Error deleting product: ", error);
      return false;
    }
  };

  return (
    <DataContext.Provider value={{ products, loading, addProduct, deleteProduct }}>
      {children}
    </DataContext.Provider>
  );
};
