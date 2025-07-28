import { Link } from 'react-router-dom';
import { siteConfig } from '../constants/siteConfig';

const Logo = ({ onLogoClick }) => (
  <Link 
    to="/" 
    className="flex items-center space-x-2"
    onClick={onLogoClick}
  >
    <span className="text-2xl font-bold font-mono">
      {siteConfig.author.logo}
    </span>
  </Link>
);

export default Logo;