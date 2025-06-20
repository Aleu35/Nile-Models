
import React, { useState } from 'react';
import { Menu, Volume2, VolumeX, Phone, Mail, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from './Logo';

interface HeaderProps {
  onMobileMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMobileMenuToggle }) => {
  const [isMuted, setIsMuted] = useState(false);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Header menu button clicked - event triggered');
    onMobileMenuToggle();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-95 backdrop-blur-md border-b border-white border-opacity-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo - Responsive sizing */}
          <div className="flex items-center">
            <Logo />
          </div>
          
          {/* Desktop Navigation - Always hidden */}
          <div className="hidden">
            <div className="flex items-center space-x-6 2xl:space-x-8">
              <Link to="/men" className="text-white hover:text-gray-300 transition-colors font-light tracking-wide text-sm">
                MEN
              </Link>
              <Link to="/women" className="text-white hover:text-gray-300 transition-colors font-light tracking-wide text-sm">
                WOMEN
              </Link>
              <Link to="/new-faces" className="text-white hover:text-gray-300 transition-colors font-light tracking-wide text-sm">
                NEW FACES
              </Link>
              <Link to="/talent" className="text-white hover:text-gray-300 transition-colors font-light tracking-wide text-sm">
                TALENT
              </Link>
              <Link to="/apply" className="bg-white text-black px-3 py-2 text-sm font-light tracking-wide hover:bg-gray-200 transition-colors">
                GET SCOUTED
              </Link>
            </div>
          </div>
          
          {/* Right side controls - Responsive */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Contact info - Hidden on mobile and small tablets */}
            <div className="hidden 2xl:flex items-center space-x-4 text-sm">
              <a href="tel:+1234567890" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                <Phone className="h-4 w-4" />
                <span className="font-light">+1 (234) 567-8900</span>
              </a>
              <a href="mailto:info@nilesmodels.com" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                <Mail className="h-4 w-4" />
                <span className="font-light">info@nilesmodels.com</span>
              </a>
            </div>
            
            {/* Audio control - Responsive sizing */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMuted(!isMuted)}
              className="text-white hover:bg-white hover:bg-opacity-10 p-2"
            >
              {isMuted ? <VolumeX className="h-4 w-4 sm:h-5 sm:w-5" /> : <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" />}
            </Button>
            
            {/* Instagram link - Responsive sizing */}
            <a
              href="https://www.instagram.com/nilemgmt/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:bg-white hover:bg-opacity-10 p-2 rounded transition-colors flex items-center justify-center"
              style={{ height: '40px', width: '40px' }}
            >
              <Instagram className="h-6 w-6 sm:h-7 sm:w-7" />
            </a>
            
            {/* Mobile menu toggle - Always visible and properly responsive */}
            <button
              onClick={handleMenuClick}
              className="text-white hover:bg-white hover:bg-opacity-10 p-2 rounded flex items-center justify-center transition-colors relative z-10"
              style={{ height: '40px', width: '40px', minWidth: '40px' }}
              aria-label="Open Menu"
              type="button"
            >
              <Menu className="h-6 w-6 sm:h-7 sm:w-7" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
