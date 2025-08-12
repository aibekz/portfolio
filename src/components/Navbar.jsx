import { HiX } from 'react-icons/hi';
import Logo from './Logo.jsx';
import MobileMenu from './MobileMenu.jsx';
import NavItem from './NavItem.jsx';
import useMenu from '../hooks/useMenu.js';

const navigationLinks = [
    { href: '/about', label: 'About' },
    { href: '/posts', label: 'Posts' },
    { href: '/contact', label: 'Contact' }
];

const Navbar = () => {
    const { menuOpen, toggleMenu, closeMenu } = useMenu();

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-50 transition-colors duration-1000 bg-primary">
                <div className="max-w-3xl mx-auto flex items-center justify-between p-6">
                    {/* Logo always on left */}
                    <div>
                        <Logo onLogoClick={closeMenu} />
                    </div>

                    {/* Desktop: Navigation links on right */}
                    <div className="hidden md:flex space-x-6 items-center">
                        {navigationLinks.map(item => (
                            <NavItem key={item.href} {...item} />
                        ))}
                    </div>

                    {/* Mobile: Menu button on right */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="focus:outline-none p-2 text-matrix-green font-medium hover:underline transition-all duration-200"
                            aria-label="Toggle menu"
                            aria-expanded={menuOpen}
                        >
                            {menuOpen ? (
                                <HiX className="w-6 h-6" />
                            ) : (
                                'Menu'
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            <MobileMenu
                menuOpen={menuOpen}
                closeMenu={closeMenu}
                navigationLinks={navigationLinks}
            />

            {/* Spacer for fixed nav */}
            <div className="h-[72px]"></div>
        </>
    );
};

export default Navbar;
