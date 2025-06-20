
import React from 'react';
import { X, Phone, Mail, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from './Logo';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  console.log('MobileMenu render - isOpen:', isOpen);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black z-[60] overflow-hidden">
      {/* Mobile header */}
      <div className="flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6 border-b border-white border-opacity-10">
        <Logo onClick={onClose} />
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-white hover:bg-white hover:bg-opacity-10 p-2"
        >
          <X className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
      </div>
      
      <div className="flex flex-col h-full">
        {/* Main navigation - Enhanced touch targets */}
        <div className="flex-1 px-4 sm:px-6 py-8 overflow-y-auto">
          <div className="flex flex-col items-center space-y-8">
            <Link 
              to="/men" 
              className="text-white hover:text-gray-300 transition-colors font-light tracking-wide text-lg py-3 px-6 rounded-lg hover:bg-white hover:bg-opacity-10 min-h-[48px] flex items-center"
              onClick={onClose}
            >
              MEN
            </Link>
            <Link 
              to="/women" 
              className="text-white hover:text-gray-300 transition-colors font-light tracking-wide text-lg py-3 px-6 rounded-lg hover:bg-white hover:bg-opacity-10 min-h-[48px] flex items-center"
              onClick={onClose}
            >
              WOMEN
            </Link>
            <Link 
              to="/new-faces" 
              className="text-white hover:text-gray-300 transition-colors font-light tracking-wide text-lg py-3 px-6 rounded-lg hover:bg-white hover:bg-opacity-10 min-h-[48px] flex items-center"
              onClick={onClose}
            >
              NEW FACES
            </Link>
            <Link 
              to="/talent" 
              className="text-white hover:text-gray-300 transition-colors font-light tracking-wide text-lg py-3 px-6 rounded-lg hover:bg-white hover:bg-opacity-10 min-h-[48px] flex items-center"
              onClick={onClose}
            >
              TALENT
            </Link>
            <Link 
              to="/apply" 
              className="bg-white text-black px-6 py-3 font-light tracking-wide hover:bg-gray-200 transition-colors rounded-lg text-lg min-h-[48px] flex items-center"
              onClick={onClose}
            >
              GET SCOUTED
            </Link>
          </div>
        </div>
        
        {/* Contact section - Enhanced for mobile */}
        <div className="border-t border-gray-600 px-4 sm:px-6 py-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium tracking-wider text-white uppercase border-b border-gray-600 pb-2">Contact</h3>
            <div className="space-y-4">
              <a href="tel:+1234567890" className="flex items-center space-x-3 text-white hover:text-gray-300 transition-colors py-3 px-4 rounded-lg hover:bg-white hover:bg-opacity-10 min-h-[48px]">
                <Phone className="h-5 w-5" />
                <span className="font-light">+1 (234) 567-8900</span>
              </a>
              <a href="mailto:info@nilesmodels.com" className="flex items-center space-x-3 text-white hover:text-gray-300 transition-colors py-3 px-4 rounded-lg hover:bg-white hover:bg-opacity-10 min-h-[48px]">
                <Mail className="h-5 w-5" />
                <span className="font-light">info@nilesmodels.com</span>
              </a>
              <a 
                href="https://www.instagram.com/nilemgmt/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-white hover:text-gray-300 transition-colors py-3 px-4 rounded-lg hover:bg-white hover:bg-opacity-10 min-h-[48px]"
              >
                <Instagram className="h-5 w-5" />
                <span className="font-light">@nilemgmt</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
