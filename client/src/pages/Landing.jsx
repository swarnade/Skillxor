import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              
              <NavLink to="/">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS01p5QVClsPyStMi8Tgx_GDTUhnnVoB-h4Nw&s" 
                  alt="Logo"
                  className="h-16"
                />
              </NavLink>
            </div>
            <nav className="hidden md:flex space-x-10">
              <NavLink to="/" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Home
              </NavLink>
              <NavLink to="/features" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Features
              </NavLink>
              <NavLink to="/pricing" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Pricing
              </NavLink>
              <NavLink to="https://github.com/swarnade/Skillxor" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Contact
              </NavLink>
            </nav>
            <div className="-mr-2 -my-2 md:hidden">
              <button
                type="button"
                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="sr-only">Open menu</span>
                {isMenuOpen ? (
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

      
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <NavLink to="/" className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900">
                Home
              </NavLink>
              <NavLink to="/features" className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900">
                Features
              </NavLink>
              <NavLink to="/pricing" className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900">
                Pricing
              </NavLink>
              <NavLink to="/contact" className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900">
                Contact
              </NavLink>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        <div className="relative bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block xl:inline">Connecting Employers with Experts,</span>{' '}
                    <span className="block text-indigo-600 xl:inline">Delivering Projects with Confidence</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Discover, Hire, and Collaborate with Freelance Experts
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="relative rounded-md shadow">
                      <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                      >
                        Get started
                      </button>
                      {isDropdownOpen && (
                        <div className="absolute mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-10">
                          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <NavLink
                              to="/employer/signup"
                              className="block px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 hover:text-gray-900 transition-colors duration-150 ease-in-out rounded-md"
                              role="menuitem"
                            >
                              Sign Up as Employer
                            </NavLink>
                            <NavLink
                              to="/freelancer/signup"
                              className="block px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 hover:text-gray-900 transition-colors duration-150 ease-in-out rounded-md"
                              role="menuitem"
                            >
                              Sign Up as Freelancer
                            </NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <img
              className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
              src="https://www.poynter.org/wp-content/uploads/2022/01/shutterstock_1751135816.png"
              alt="Product illustration"
            />
          </div>
        </div>

       
      </main>

      <footer className="bg-gray-800">
  <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
    <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
      <div className="px-5 py-2">
        <NavLink to="#" className="text-base text-gray-400 hover:text-gray-300">
          About
        </NavLink>
      </div>
      <div className="px-5 py-2">
        <NavLink to="#" className="text-base text-gray-400 hover:text-gray-300">
          Blog
        </NavLink>
      </div>
      <div className="px-5 py-2">
        <NavLink to="#" className="text-base text-gray-400 hover:text-gray-300">
          Jobs
        </NavLink>
      </div>
      <div className="px-5 py-2">
        <NavLink to="#" className="text-base text-gray-400 hover:text-gray-300">
          Press
        </NavLink>
      </div>
      <div className="px-5 py-2">
        <NavLink to="#" className="text-base text-gray-400 hover:text-gray-300">
          Privacy
        </NavLink>
      </div>
      <div className="px-5 py-2">
        <NavLink to="#" className="text-base text-gray-400 hover:text-gray-300">
          Terms
        </NavLink>
      </div>
    </nav>
    <p className="mt-4 text-center text-sm text-gray-400">
      &copy; 2024 Skillxor, Inc. All rights reserved.
    </p>
  </div>
</footer>
    </div>
  );
};

export default LandingPage;
