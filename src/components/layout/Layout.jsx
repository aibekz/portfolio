import { useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';

const Layout = ({ children }) => {
  useEffect(() => {
    // Always ensure dark mode is applied
    document.documentElement.classList.add('dark');
    // Clean up any theme preferences
    localStorage.removeItem('theme');
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
