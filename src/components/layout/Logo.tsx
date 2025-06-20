
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({ onClick }) => {
  return (
    <Link to="/" className="group" onClick={onClick}>
      <div className="text-2xl sm:text-3xl font-light tracking-[0.2em] sm:tracking-[0.25em] text-white group-hover:text-gray-300 transition-all duration-300">
        NILES
      </div>
      <div className="text-xs font-light tracking-[0.2em] sm:tracking-[0.3em] text-gray-400 mt-1 uppercase">
        Models
      </div>
    </Link>
  );
};

export default Logo;
