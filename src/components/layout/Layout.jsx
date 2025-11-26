// Layout Wrapper Component
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar at top */}
      <Navbar />
      
      {/* Main content area - grows to fill space */}
      <main className="grow">
        <Outlet />
      </main>
      
      {/* Footer at bottom */}
      <Footer />
    </div>
  );
};

export default Layout;
