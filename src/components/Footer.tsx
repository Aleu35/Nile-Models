
import React from 'react';
import { Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteSettings } from '@/hooks/useSiteSettings';

// Footer component appears at the bottom of every page with contact info and links
const Footer: React.FC = () => {
  const { data: settings } = useSiteSettings();

  return (
    // Footer with dark background and top border
    <footer className="bg-black bg-opacity-90 border-t border-white border-opacity-20 mt-16">
      {/* Main footer content container */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Footer content grid - 1 column on mobile, 4 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Agency branding and description */}
          <div>
            {/* Agency name from settings or fallback */}
            <h3 className="text-2xl font-bold tracking-wider mb-4">
              {settings?.agency_name || 'NILES MODELS'}
            </h3>
            {/* Agency description from settings or fallback */}
            <p className="text-gray-400 text-sm">
              {settings?.tagline || 'Elite modeling agency representing the world\'s top talent.'}
            </p>
          </div>
          
          {/* Column 2: Quick navigation links - Made clickable */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            {/* List of main category links - now properly clickable */}
            <div className="space-y-2 text-gray-400 text-sm">
              <Link 
                to="/men" 
                className="block hover:text-white transition-colors duration-200 cursor-pointer"
              >
                Men
              </Link>
              <Link 
                to="/women" 
                className="block hover:text-white transition-colors duration-200 cursor-pointer"
              >
                Women
              </Link>
              <Link 
                to="/new-faces" 
                className="block hover:text-white transition-colors duration-200 cursor-pointer"
              >
                New Faces
              </Link>
              <Link 
                to="/talent" 
                className="block hover:text-white transition-colors duration-200 cursor-pointer"
              >
                Talent
              </Link>
            </div>
          </div>
          
          {/* Column 3: Services offered */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            {/* List of services - you can modify these to match your offerings */}
            <div className="space-y-2 text-gray-400 text-sm">
              <div>Model Management</div>
              <div>Casting Services</div>
              <div>Brand Partnerships</div>
              <div>Career Development</div>
            </div>
          </div>
          
          {/* Column 4: Contact information from settings - now clickable */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-gray-400 text-sm">
              {/* Phone number with phone icon - clickable tel link */}
              <a 
                href={`tel:${settings?.contact_phone || '+15551234567'}`}
                className="flex items-center space-x-2 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>{settings?.contact_phone || '+1 (555) 123-4567'}</span>
              </a>
              
              {/* Email address with mail icon - clickable mailto link */}
              <a 
                href={`mailto:${settings?.contact_email || 'info@nilemodels.com'}`}
                className="flex items-center space-x-2 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="break-all">{settings?.contact_email || 'info@nilemodels.com'}</span>
              </a>
              
              {/* Physical location with map pin icon */}
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>New York, NY</span>
              </div>
              
              {/* Instagram handle with Instagram icon - clickable link to Instagram */}
              <a 
                href="https://www.instagram.com/nilemgmt/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                <Instagram className="h-4 w-4 flex-shrink-0" />
                <span>@nilemgmt</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Footer bottom section with copyright */}
        <div className="border-t border-white border-opacity-20 mt-8 pt-6 text-center text-gray-400 text-sm">
          {/* Copyright notice with agency name from settings */}
          <p>&copy; 2024 {settings?.agency_name || 'Niles Models'}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
