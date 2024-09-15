import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Sun } from 'lucide-react';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/serverstatus', label: 'Server Status' },
    { to: '/contact', label: 'Contact' },
  ];

  const NavItems = ({ mobile = false }) => (
    <>
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `text-base font-medium transition-colors ${
              isActive
                ? 'text-indigo-600 dark:text-indigo-400'
                : mobile
                ? 'text-indigo-900 dark:text-indigo-100 hover:text-indigo-600 dark:hover:text-indigo-400'
                : 'text-indigo-700 dark:text-indigo-300 hover:text-indigo-600 dark:hover:text-indigo-400'
            }`
          }
          onClick={() => mobile && setIsMobileMenuOpen(false)}
        >
          {item.label}
        </NavLink>
      ))}
    </>
  );

  return (
    <header className="bg-white dark:bg-indigo-900 border-b border-indigo-200 dark:border-indigo-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center space-x-2">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS01p5QVClsPyStMi8Tgx_GDTUhnnVoB-h4Nw&s" alt="Logo" className="h-20 w-30" />
          </NavLink>
          
          {/* Navigation Items */}
          <nav className="hidden md:flex items-center space-x-6 ml-auto">
            <NavItems />
          </nav>
          
          {/* Theme Toggle and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-indigo-900"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
              <span className="sr-only">Toggle menu</span>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4">
            <nav className="flex flex-col space-y-4">
              <NavItems mobile />
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
