import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Settings from './pages/Settings';
import Docs from './pages/Docs';
import { ThemeProvider } from './contexts/ThemeContext';
import { GenerationProvider } from './contexts/GenerationContext';

function App() {
  return (
    <ThemeProvider>
      <GenerationProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900 transition-colors duration-300">
            <Header />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/docs" element={<Docs />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </GenerationProvider>
    </ThemeProvider>
  );
}

export default App;