import { Link } from 'react-router-dom';

const NavItem = ({ href, label, onClick, className }) => (
    <Link
        to={href}
        onClick={onClick}
        className={`font-medium nav-link ${className}`}
    >
        {label}
    </Link>
);

export default NavItem;
