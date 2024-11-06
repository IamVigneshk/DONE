import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Services from './components/Services';
import About from './components/About';
import AdminPage from './components/AdminPage';
import UserPage from './components/UserPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Features />
                <Services />
                <About />
              </>
            } />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/user" element={<UserPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;