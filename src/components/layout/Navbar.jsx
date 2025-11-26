// Navbar Component
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Home, FileText, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import logoImage from '../../assets/logo (small).png';

const Navbar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/home', label: 'Home', icon: Home },
    { path: '/submit-report', label: 'Submit Report', icon: FileText },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-3">
            <img src={logoImage} alt="UK-Guard Logo" className="h-10 w-auto" />
            <span className="text-2xl font-bold text-purple-700">UK-Guard</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    isActive(link.path)
                      ? 'bg-purple-700 text-white'
                      : 'text-gray-700 hover:bg-purple-100 hover:text-purple-700'
                  }`}
                >
                  <Icon size={20} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Info - Desktop */}
          {user && (
            <div className="hidden md:flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-700 text-white flex items-center justify-center font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {/* User Info - Mobile */}
            {user && (
              <div className="flex items-center gap-3 px-4 py-3 mb-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-purple-700 text-white flex items-center justify-center font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
            )}
            
            {/* Navigation Links - Mobile */}
            <div className="space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                      isActive(link.path)
                        ? 'bg-purple-700 text-white'
                        : 'text-gray-700 hover:bg-purple-100 hover:text-purple-700'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
