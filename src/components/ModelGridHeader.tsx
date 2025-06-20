
import React from 'react';
import { Link } from 'react-router-dom';

interface ModelGridHeaderProps {
  title: string;
}

const ModelGridHeader: React.FC<ModelGridHeaderProps> = ({ title }) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-3xl font-light tracking-[0.3em] uppercase text-white mb-8">
        NILES
      </h1>
      <div className="text-xs font-light tracking-[0.2em] text-gray-400 mb-8 uppercase">
        Models
      </div>
      
      {/* Crawford-style navigation - Now with clickable links */}
      <div className="flex justify-center items-center space-x-8 text-white mb-8">
        <Link 
          to="/men"
          className={`text-lg font-light tracking-wide ${title === 'Men Models' ? 'text-white' : 'text-gray-500'} hover:text-white transition-colors cursor-pointer`}
        >
          MEN
        </Link>
        <Link 
          to="/women"
          className={`text-lg font-light tracking-wide ${title === 'Women Models' ? 'text-white' : 'text-gray-500'} hover:text-white transition-colors cursor-pointer`}
        >
          WOMEN
        </Link>
        <Link 
          to="/talent"
          className={`text-lg font-light tracking-wide ${title === 'Talent' ? 'text-white' : 'text-gray-500'} hover:text-white transition-colors cursor-pointer`}
        >
          TALENT
        </Link>
      </div>
      
      {/* Secondary navigation */}
      <div className="flex justify-center items-center space-x-8 text-gray-400 text-sm">
        <span className="hover:text-white transition-colors cursor-pointer">IMAGE</span>
        <Link 
          to="/men"
          className="hover:text-white transition-colors cursor-pointer"
        >
          MEN
        </Link>
        <Link 
          to="/new-faces"
          className={`${title === 'New Faces' ? 'text-white' : 'text-gray-400'} hover:text-white transition-colors cursor-pointer`}
        >
          NEW FACES
        </Link>
      </div>
    </div>
  );
};

export default ModelGridHeader;
