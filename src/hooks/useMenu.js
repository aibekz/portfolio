import { useState, useCallback } from 'react';

const useMenu = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = useCallback(() => {
        setMenuOpen(false);
    }, []);

    const toggleMenu = useCallback(() => {
        setMenuOpen(prev => !prev);
    }, []);

    return { menuOpen, toggleMenu, closeMenu };
};

export default useMenu;
