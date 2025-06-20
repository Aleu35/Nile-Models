
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import VideoBackground from '@/components/VideoBackground';
import InstagramFeed from '@/components/InstagramFeed';
import MobileMenu from '@/components/layout/MobileMenu';
import SearchOverlay from '@/components/SearchOverlay';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Search, Menu } from 'lucide-react';

const Index = () => {
  const { data: settings } = useSiteSettings();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <MainLayout hideHeader={true}>
      <div className="relative min-h-screen">
        <VideoBackground settings={settings}>
          {/* Top-Right Controls */}
          <div className="absolute top-6 right-6 z-20">
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleSearchToggle}
                className="text-white hover:opacity-70 transition-opacity duration-300"
              >
                <Search className="h-6 w-6" />
              </button>
              <a
                href="https://www.instagram.com/nilemgmt/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:opacity-70 transition-opacity duration-300"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <button 
                onClick={handleMobileMenuToggle}
                className="text-white hover:opacity-70 transition-opacity duration-300"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Centered Logo and Navigation */}
          <div className="text-center max-w-6xl mx-auto px-4">
            {/* Responsive Main Logo - Always on one line */}
            <div className="mb-12">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-light tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] lg:tracking-[0.25em] text-white opacity-90 whitespace-nowrap">
                NILE MODELS
              </div>
            </div>
            
            {/* Simplified Navigation Menu - 3 items, bolded, no dots */}
            <nav className="mb-8">
              <div className="flex justify-center items-center space-x-8 sm:space-x-12 md:space-x-16 text-white">
                <Link 
                  to="/men" 
                  className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide hover:opacity-70 transition-opacity duration-300"
                >
                  MEN
                </Link>
                <Link 
                  to="/women" 
                  className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide hover:opacity-70 transition-opacity duration-300"
                >
                  WOMEN
                </Link>
                <Link 
                  to="/new-faces" 
                  className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide hover:opacity-70 transition-opacity duration-300"
                >
                  NEW FACES
                </Link>
              </div>
            </nav>
          </div>
          
          {/* Social Media Icons at Bottom */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-6">
              <a
                href="https://www.instagram.com/nilemgmt/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:opacity-70 transition-opacity duration-300"
              >
                <Instagram className="h-6 w-6 sm:h-7 sm:w-7" />
              </a>
              <a
                href="https://www.facebook.com/nilemgmt/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:opacity-70 transition-opacity duration-300"
              >
                <Facebook className="h-6 w-6 sm:h-7 sm:w-7" />
              </a>
              <a
                href="https://www.tiktok.com/@nilemgmt/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:opacity-70 transition-opacity duration-300"
              >
                <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>
        </VideoBackground>
      </div>
      
      {/* Instagram Feed */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <InstagramFeed />
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </MainLayout>
  );
};

export default Index;
