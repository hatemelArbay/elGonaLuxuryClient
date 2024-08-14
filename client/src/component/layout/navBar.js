import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import '../../App.css';

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/logIn');
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    
    if (scrollPosition > windowHeight) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    if (location.pathname === '/') {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-20 h-22 top-0 start-0 pl-3 pr-3 transition-colors duration-300 
      ${location.pathname === '/' 
        ? (scrolled 
            ? 'bg-white text-black' 
            : 'md:bg-transparent sm:bg-white text-black')
        : 'bg-white text-black'
      }`}>
      <div className="flex flex-wrap items-center justify-between pt-0">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-40" alt="Logo" />
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button 
            onClick={handleGetStarted} 
            type="button" 
            className={`text-sm px-4 py-2 rounded-lg font-medium focus:outline-none transition-colors duration-300 
            ${location.pathname === '/' 
              ? (scrolled 
                  ? 'bg-black text-white' 
                  : 'bg-custom-nav-button text-white') 
              : 'bg-black text-white'}`}>
            Get started
          </button>

          <button onClick={toggleMenu} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-sticky" aria-expanded={isOpen}>
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isOpen ? 'block' : 'hidden'}`} id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-transparent">
            <li>
              <Link 
                to="/" 
                onClick={closeMenu} 
                className={`block py-2 px-3 rounded md:p-0 transition-colors duration-300 ${location.pathname === '/' && !scrolled ? 'md:text-white sm:text-black' : 'text-black'} hover:bg-gray-200`} 
                aria-current="page">Home</Link>
            </li>
            <li>
              <a 
                href="#aboutUs" 
                onClick={closeMenu} 
                className={`block py-2 px-3 rounded md:p-0 transition-colors duration-300 ${location.pathname === '/' && !scrolled ? 'md:text-white sm:text-black' : 'text-black'} hover:bg-gray-200`}>About</a>
            </li>
            <li>
              <a 
                href="#services" 
                onClick={closeMenu} 
                className={`block py-2 px-3 rounded md:p-0 transition-colors duration-300 ${location.pathname === '/' && !scrolled ? 'md:text-white sm:text-black' : 'text-black'} hover:bg-gray-200`}>Services</a>
            </li>
            <li>
              <a 
                href="/#contactUs" 
                onClick={closeMenu} 
                className={`block py-2 px-3 rounded md:p-0 transition-colors duration-300 ${location.pathname === '/' && !scrolled ? 'md:text-white sm:text-black' : 'text-black'} hover:bg-gray-200`}>Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
