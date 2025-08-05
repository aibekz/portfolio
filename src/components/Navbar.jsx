import { HiMenu, HiX } from 'react-icons/hi';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const navigationLinks = [
        { href: '/about', label: 'About' },
        { href: '/posts', label: 'Posts' },
        { href: '/contact', label: 'Contact' }
    ];

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-50 transition-colors duration-1000 bg-primary">
                <div className="max-w-3xl mx-auto flex items-center justify-between p-6">
                    {/* Logo always on left */}
                    <div>
                        <Logo onLogoClick={() => setMenuOpen(false)} />
                    </div>

                    {/* Desktop: Navigation links on right */}
                    <div className="hidden md:flex space-x-6 items-center">
                        {navigationLinks.map(({ href, label }) => (
                            <Link
                                key={href}
                                to={href}
                                className="font-medium nav-link"
                            >
                                {label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile: Menu button on right */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="focus:outline-none p-2"
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? (
                                <HiX className="w-6 h-6 text-matrix-green" />
                            ) : (
                                <HiMenu className="w-6 h-6 text-matrix-green" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div
                className={`fixed top-[72px] right-0 h-screen w-full bg-primary z-40 transform transition-transform duration-500 ease-in-out ${
                    menuOpen ? 'translate-x-0' : 'translate-x-full'
                } md:hidden`}
            >
                <div className="flex flex-col h-full">
                    {/* Menu content */}
                    <div className="flex-1 flex flex-col items-start justify-start p-6 space-y-8">
                        <div className="text-left">
                            {/* Navigation Links */}
                            <div className="space-y-4">
                                {navigationLinks.map(({ href, label }) => (
                                    <Link
                                        key={href}
                                        to={href}
                                        onClick={() => setMenuOpen(false)}
                                        className="block text-xl font-medium nav-link"
                                    >
                                        {label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Spacer for fixed nav */}
            <div className="h-[72px]"></div>
        </>
    );
};

export default Navbar;
