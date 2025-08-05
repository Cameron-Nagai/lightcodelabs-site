import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Add background grid pattern */}
      <div className="fixed inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      <Navigation />
      <Hero />
      <About />
      <Portfolio />
      <Contact />
      
      {/* Footer */}
      <footer className="border-t border-cyan-400/20 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-cyan-400 mb-2">
              LightCode<span className="text-white">Labs</span>
            </h3>
            <p className="text-gray-400 mb-4">Where design meets technology</p>
            <p className="text-gray-500 text-sm">
              © 2025 LightCode Labs. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;