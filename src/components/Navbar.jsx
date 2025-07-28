import { HiMenu, HiX } from 'react-icons/hi';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import { socialLinks } from '../constants/socialLinks.js';
import { isExternalLink } from '../utils';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const renderSocialIcons = (size = 'w-6 h-6', extraClasses = '') =>
        socialLinks.map(({ href, icon: Icon, label, color, isInternal }) => {
            const iconElement = (
                <Icon className={`${size} ${color} transition-colors duration-200 ${extraClasses}`} />
            );
            
            if (isInternal || !isExternalLink(href)) {
                return (
                    <Link
                        key={label}
                        to={href}
                        aria-label={label}
                        className="focus:outline-none focus:ring-2 focus:ring-linkblue focus:ring-offset-2 rounded"
                    >
                        {iconElement}
                    </Link>
                );
            }
            
            return (
                <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus:outline-none focus:ring-2 focus:ring-linkblue focus:ring-offset-2 rounded"
                >
                    {iconElement}
                </a>
            );
        });
    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-50 px-6 py-8 bg-white">
                <div className="flex items-center justify-between">
                    {/* Logo always on left */}
                    <div>
                        <Logo />
                    </div>

                    {/* Desktop: Social icons on right */}
                    <div className="hidden md:flex space-x-6 items-center">
                        {renderSocialIcons()}
                    </div>

                    {/* Mobile: Menu button on right */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="focus:outline-none p-2"
                            aria-label="Toggle menu"
                        >
                            {menuOpen ? (
                                <HiX className="w-6 h-6" />
                            ) : (
                                <HiMenu className="w-6 h-6" />
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
                                <HiX className="w-8 h-8" />
                            </button>
                        </div>

                        {/* Menu content */}
                        <div className="flex-1 flex flex-col items-center justify-center space-y-8">
                            <div className="text-center">
                                <div className='mb-8'>
                                    <Logo onLogoClick={() => setMenuOpen(false)} />
                                </div>
                                <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                                    {renderSocialIcons('w-8 h-8 sm:w-10 sm:h-10')}
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
