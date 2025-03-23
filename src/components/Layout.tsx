import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Home, FileText, Calculator, Menu, X, Globe } from 'lucide-react';
import ResponsiveContainer from './ResponsiveContainer';
import ihorizonImage from '/assets/img/ihorizon.png';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations';

const Layout = () => {
  const { language, setLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    setMobileMenuOpen(false);
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#131415] via-[#1a1a1c] to-[#131415]">
      <header className={`site-header fixed top-0 z-[100] backdrop-blur-md border-b transition-all duration-300 ${
        scrollPosition > 20 
          ? 'bg-[#131415]/95 border-[#303236]/50 py-0' 
          : 'bg-[#131415]/80 border-[#303236]/30 py-0.5 md:py-2'
      }`}>
        <ResponsiveContainer>
          <div className={`flex justify-between items-center transition-all duration-300 ${
            scrollPosition > 20 ? 'scale-90' : 'scale-100'
          }`}>
            <Link to="/" className="site-logo z-[101]">
              <div className="logo-container flex items-center">
                <img src={ihorizonImage} alt="iHorizon Logo" className="w-6 h-6 md:w-12 md:h-12" />
              </div>
              <span className="logo-text">iHorizon</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-md text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                aria-label="Changer la langue"
              >
                <Globe size={18} />
                <span className="uppercase">{language}</span>
              </button>
              
              <button 
                className="md:hidden z-[101] p-2 text-white focus:outline-none"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
            
            <nav className="main-nav hidden md:flex items-center space-x-6">
              <Link to="/" className={`flex items-center space-x-1 px-3 py-1.5 rounded-md transition-all text-gray-300 hover:text-white hover:bg-white/5`}>
                <Home size={18} />
                <span>{getTranslation('home', language)}</span>
              </Link>
              <Link to="/documentation" className={`flex items-center space-x-1 px-3 py-1.5 rounded-md transition-all text-gray-300 hover:text-white hover:bg-white/5`}>
                <FileText size={18} />
                <span>{getTranslation('documentation', language)}</span>
              </Link>
            </nav>
          </div>
        </ResponsiveContainer>
      </header>
      
      {/* Menu mobile */}
      <div className={`fixed inset-0 bg-[#131415]/95 backdrop-blur-lg z-[99] transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <div className="flex flex-col h-full">
          <div className="flex justify-end p-4">
            <button 
              className="p-2 text-white focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Fermer le menu"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center flex-1 space-y-8 px-4">
            <Link 
              to="/" 
              className="text-xl font-medium flex items-center space-x-2 p-3 text-white transition-colors hover:bg-white/5 rounded-lg w-full max-w-xs text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Home size={24} />
              <span>{getTranslation('home', language)}</span>
            </Link>
            <Link 
              to="/documentation" 
              className="text-xl font-medium flex items-center space-x-2 p-3 text-white transition-colors hover:bg-white/5 rounded-lg w-full max-w-xs text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FileText size={24} />
              <span>{getTranslation('documentation', language)}</span>
            </Link>
            <button
              onClick={toggleLanguage}
              className="text-xl font-medium flex items-center space-x-2 p-3 text-white transition-colors hover:bg-white/5 rounded-lg w-full max-w-xs text-center"
              aria-label="Changer la langue"
            >
              <Globe size={24} />
              <span className="uppercase">{language}</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Contenu principal */}
      <div className="relative min-h-screen">
        <main className="relative w-full min-h-[calc(100vh-160px)] pt-24 md:pt-20">
          <Outlet />
        </main>
        
        <footer className="site-footer py-8 border-t border-[#303236]/30">
          <ResponsiveContainer>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-8 md:space-y-0">
              {/* Logo et Copyright */}
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                  <img
                    src={ihorizonImage}
                    alt="iHorizon Logo"
                    className="w-8 h-8"
                    loading="eager"
                  />
                  <span className="text-2xl font-bold text-white">iHorizon</span>
                </div>
                <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} iHorizon 2025. {getTranslation('copyright', language)}</p>
              </div>

              {/* Séparateur - visible uniquement sur mobile */}
              <div className="w-full max-w-xs h-px bg-[#303236]/30 md:hidden"></div>

              {/* Liens et Calculateur */}
              <div className="flex flex-col md:flex-row md:items-center md:space-x-8 space-y-6 md:space-y-0 w-full md:w-auto">
                {/* Liens de navigation */}
                <div className="grid grid-cols-2 md:flex md:space-x-8 gap-6 text-sm w-full md:w-auto">
                  <Link
                    to="/docs"
                    className="text-white hover:text-[var(--secondaryColor)] transition-colors text-center"
                  >
                    {getTranslation('documentation', language)}
                  </Link>
                  <a
                    href="https://discord.gg/B6UNgNUjbt"
                    className="text-white hover:text-[var(--secondaryColor)] transition-colors text-center"
                  >
                    {getTranslation('support', language)}
                  </a>
                  <Link
                    to="/discord"
                    className="text-white hover:text-[var(--secondaryColor)] transition-colors text-center"
                  >
                    {getTranslation('discordBot', language)}
                  </Link>
                  <a
                    href="https://github.com/ihrz/ihrz"
                    className="text-white hover:text-[var(--secondaryColor)] transition-colors text-center"
                  >
                    {getTranslation('github', language)}
                  </a>
                </div>

                {/* Bouton Calculateur */}
                <Link 
                  to="/tools/bb_calculator" 
                  className="flex items-center justify-center space-x-2 px-6 py-2.5 rounded-md bg-gradient-to-r from-[#db00ac] to-[rgba(192,0,166,0.8)] text-white hover:shadow-lg hover:shadow-pink-600/20 transition-all w-full md:w-auto"
                >
                  <Calculator size={18} />
                  <span>{getTranslation('calculator', language)}</span>
                </Link>
              </div>
            </div>
          </ResponsiveContainer>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
