import { Link } from 'react-router-dom';
import { siteConfig } from '../constants/siteConfig';
import React from 'react';

const Logo = ({ onLogoClick }) => (
  <Link 
    to="/" 
    className="flex items-center space-x-2"
    onClick={onLogoClick}
  >
    <span className="text-2xl font-bold font-mono text-accent">
      {siteConfig.author.logo}
    </span>
  </Link>
);

export default React.memo(Logo);
