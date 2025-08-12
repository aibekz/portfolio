import React from 'react';
import NavItem from './NavItem.jsx';

const MobileMenu = ({ menuOpen, closeMenu, navigationLinks }) => {
    const menuClasses = `fixed top-[72px] right-0 h-screen w-full bg-primary z-40 transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`;

    return (
        <div className={menuClasses}>
            <div className="flex flex-col h-full">
                <div className="flex-1 flex flex-col items-start justify-start p-6 space-y-8">
                    <div className="text-left">
                        <div className="space-y-4">
                            {navigationLinks.map(item => (
                                <NavItem
                                    key={item.href}
                                    {...item}
                                    onClick={closeMenu}
                                    className="block text-xl"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(MobileMenu);
