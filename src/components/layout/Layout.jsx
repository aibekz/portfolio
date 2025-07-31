import Navbar from '../Navbar';
import Footer from '../Footer';
import useDynamicFavicon from '../../hooks/useDynamicFavicon';

const Layout = ({ children }) => {
  useDynamicFavicon();
  
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
