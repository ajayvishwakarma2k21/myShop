import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { LanguageProvider } from './context/LanguageContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
// import Parlour from './pages/Parlour';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAdmin } = useAuth();
  
  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <LanguageProvider>
          <DataProvider>
            <div className="App flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  {/* <Route path="/parlour" element={<Parlour />} /> */}
                  <Route path="/admin-login" element={<AdminLogin />} />
                  <Route 
                    path="/admin" 
                    element={
                      <ProtectedRoute>
                        <Admin />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </main>
              <Footer />
            </div>
          </DataProvider>
        </LanguageProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
