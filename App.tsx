import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutOwner from './components/AboutOwner';
import Services from './components/Services';
import Brands from './components/Brands';
import Fleet from './components/Fleet';
import AskGlenn from './components/AskGlenn';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <AboutOwner />
        <Services />
        <Brands />
        <Fleet />
        <AskGlenn />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

export default App;