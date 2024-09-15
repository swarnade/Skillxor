// LandingPage.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Header } from '../components/Header';

const LandingPage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <div className="relative bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block xl:inline">Connecting Employers with Experts,</span>{' '}
                    <span className="block text-indigo-900 xl:inline">Delivering Projects with Confidence</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Discover, Hire, and Collaborate with Freelance Experts
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="relative rounded-md shadow">
                      <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-900 hover:bg-indigo-900 md:py-4 md:text-lg md:px-10"
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
        {/* Footer Content */}
      </footer>
    </div>
  );
};

export default LandingPage;
