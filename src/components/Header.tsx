import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, setIsServicesDropdownOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu on route change
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
  }, [location]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/achievements', label: 'Achievements' },
    { path: '/technology', label: 'Solution' },
    { path: '/contact', label: 'Contact' },
  ];


  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-md ${
        isScrolled
          ? 'bg-white/90 dark:bg-gray-900/90 shadow-xl py-3 border-b border-gray-200/20 dark:border-gray-700/20'
          : 'bg-gradient-to-b from-pradivya-neutral/80 to-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center group">
            <Link
              to="/"
              className="relative overflow-hidden rounded-lg p-1 transition-all duration-300 hover:bg-white/50 dark:hover:bg-gray-800/50"
            >
              <img
                src="/img/pradivya-logo-small.webp"
                width="70"
                height="50"
                alt="Pradivya Software"
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 font-semibold text-sm tracking-wide transition-all duration-300 rounded-lg group ${
                  isActive(item.path)
                    ? 'text-pradivya-primary dark:text-pradivya-accent bg-pradivya-primary/10 dark:bg-pradivya-accent/10'
                    : 'text-gray-700 dark:text-gray-300 hover:text-pradivya-primary dark:hover:text-pradivya-accent hover:bg-gray-100/80 dark:hover:bg-gray-800/50'
                }`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-1/2 w-0 h-0.5 bg-pradivya-primary dark:bg-pradivya-accent transition-all duration-300 transform -translate-x-1/2 ${
                  isActive(item.path) ? 'w-6' : 'group-hover:w-6'
                }`} />
              </Link>
            ))}

          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Request Demo Button */}
            <a
              href="/contact"
              className="hidden md:inline-flex btn-primary text-sm px-6 py-2.5 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Request Demo
            </a>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-gray-200/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 hover:bg-gray-300/80 dark:hover:bg-gray-700/80 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-gray-200/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-300/80 dark:hover:bg-gray-700/80 transition-all duration-300 hover:scale-105"
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-5">
                <span className={`absolute top-1 left-0 w-5 h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`} />
                <span className={`absolute top-2.5 left-0 w-5 h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`} />
                <span className={`absolute top-4 left-0 w-5 h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-500 ${
        isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="container mx-auto px-4 py-6">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-4 py-3 rounded-lg font-semibold text-base transition-all duration-300 ${
                    isActive(item.path)
                      ? 'text-pradivya-primary dark:text-pradivya-accent bg-pradivya-primary/10 dark:bg-pradivya-accent/10 transform translate-x-2'
                      : 'text-gray-700 dark:text-gray-300 hover:text-pradivya-primary dark:hover:text-pradivya-accent hover:bg-gray-100/80 dark:hover:bg-gray-800/50 hover:translate-x-1'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                <a
                  href="/contact#request"
                  className="block btn-primary text-center text-base py-3 transform hover:scale-105 transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Request Demo
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
