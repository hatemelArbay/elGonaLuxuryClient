import React from 'react';
import { FaFacebookF, FaDiscord, FaTwitter,FaInstagram,FaWhatsapp } from 'react-icons/fa';
import Logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="flex flex-col md:flex-row justify-around items-center">
          {/* Left Section - Logo */}
          <div className="flex justify-center md:justify-start">
            <Link to="/" className="flex items-center">
              <img src={Logo} className="h-30 sm:h-28 md:h-32 lg:h-40" alt="Logo" />
            </Link>
          </div>

          {/* Right Section - Contact Information */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Contact Us</h2>
            <ul className="list-none text-gray-500 dark:text-gray-400 font-medium p-0 m-0 text-center md:text-left">
              <li className="mb-4">
                <a href="mailto:info@gonaluxury.com" className="text-black hover:underline">Email: info@gonaluxury.com</a>
              </li>
              <li>
                <a href="tel:+1234567890" className="text-black hover:underline">Phone: +1 (234) 567-890</a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />

        <div className="flex justify-around items-center w-full">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            © 2023 <a href="/" className="text-black hover:underline">Gona Luxury™</a>. All Rights Reserved.
          </span>

          <div className="flex space-x-4">
          <a href="https://www.instagram.com/el_gouna_luxury_rentals?igsh=NXhxbTRhN3Y1dHRr&utm_source=qr" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <FaFacebookF className="w-4 h-4" aria-hidden="true" />
              <span className="sr-only">Facebook page</span>
            </a>
            
            <a href="https://www.instagram.com/el_gouna_luxury_rentals?igsh=NXhxbTRhN3Y1dHRr&utm_source=qr" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <FaInstagram className="w-4 h-4" aria-hidden="true" />
              <span className="sr-only">Instagram page</span>
            </a>
            
          
            <a href="wa.link/041ehi" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <FaWhatsapp className="w-4 h-4" aria-hidden="true" />
              <span className="sr-only">Whatsapp</span>
            </a>
          
           
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
