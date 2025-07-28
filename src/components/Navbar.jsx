import { HiMenu, HiX } from 'react-icons/hi';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const navigationLinks = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/posts', label: 'Posts' },
        { href: '/contact', label: 'Contact' }
    ];

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-50 px-6 py-8 bg-white">
                <div className="flex items-center justify-between">
                    {/* Logo always on left */}
                    <div>
                        <Logo />
                    </div>

                    {/* Desktop: Navigation links on right */}
                    <div className="hidden md:flex space-x-6 items-center">
                        {navigationLinks.map(({ href, label }) => (
                            <Link
                                key={href}
                                to={href}
                                className="text-darktext hover:text-linkblue transition-colors duration-200 font-medium"
                            >
                                {label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile: Menu button on right */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="focus:outline-none p-2"
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? (
                                <HiX className="w-6 h-6 text-darktext" />
                            ) : (
                                <HiMenu className="w-6 h-6 text-darktext" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {menuOpen && (
                <div className="fixed inset-0 z-50 bg-white md:hidden">
                    <div className="flex flex-col h-full">
                        {/* Close button */}
                        <div className="flex justify-end p-6">
                            <button
                                onClick={() => setMenuOpen(false)}
                                className="focus:outline-none p-2"
                                aria-label="Close menu"
                            >
                                <HiX className="w-8 h-8 text-darktext" />
                            </button>
                        </div>

                        {/* Menu content */}
                        <div className="flex-1 flex flex-col items-center justify-center space-y-8">
                            <div className="text-center">
                                <div className='mb-8'>
                                    <Logo onLogoClick={() => setMenuOpen(false)} />
                                </div>
                                
                                {/* Navigation Links */}
                                <div className="space-y-4">
                                    {navigationLinks.map(({ href, label }) => (
                                        <Link
                                            key={href}
                                            to={href}
                                            onClick={() => setMenuOpen(false)}
                                            className="block text-xl text-darktext hover:text-linkblue transition-colors duration-200 font-medium"
                                        >
                                            {label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Spacer for fixed nav */}
            <div className="h-[72px]"></div>
        </>
    );
};

export default Navbar;
