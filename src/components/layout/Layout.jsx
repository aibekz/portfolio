import Navbar from '../Navbar';
import Footer from '../Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow flex items-center justify-center text-center px-6 py-16 sm:py-24">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
