
import React, { useState } from 'react';
import Header from './Header';
import MobileMenu from './MobileMenu';
import Footer from '@/components/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
  hideHeader?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, hideHeader = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  console.log('MainLayout render - isMobileMenuOpen:', isMobileMenuOpen);

  // Handler to toggle the menu - works for all screen sizes
  const handleMobileMenuToggle = () => {
    console.log('Menu toggle clicked - current state:', isMobileMenuOpen);
    setIsMobileMenuOpen(prev => {
      const newState = !prev;
      console.log('Setting new menu state:', newState);
      return newState;
    });
  };

  const handleMobileMenuClose = () => {
    console.log('Menu close called');
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {!hideHeader && (
        <>
          <Header onMobileMenuToggle={handleMobileMenuToggle} />
          <MobileMenu isOpen={isMobileMenuOpen} onClose={handleMobileMenuClose} />
        </>
      )}

      {/* Main Content Area - Responsive padding, no top padding when header is hidden */}
      <main className={hideHeader ? "" : "pt-16 sm:pt-20"}>
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
