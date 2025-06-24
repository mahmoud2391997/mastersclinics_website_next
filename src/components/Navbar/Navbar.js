import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ Logo, hclass }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    document.body.style.overflow = newState ? 'hidden' : 'auto';
    if (!newState) setIsDropdownOpen(false);
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`bg-white shadow-sm fixed w-full z-[111] transition-all duration-300 ${hclass}`}
      style={{
        top: isScrolled ? '0px' : '70px',
      }}
      dir="rtl"
    >
      <div className="container mx-auto px-4 flex items-center justify-between py-3">
        {/* Logo */}
        <Link to="/" className="hover:opacity-90 transition-opacity duration-200">
          <img src={Logo} alt="شعار العيادات المتخصصة" className="h-24 w-auto object-contain" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          {/* Links */}
          <ul className="flex items-center gap-6">
            <li>
              <Link
                to="/"
                className={`text-md font-medium px-3 py-2 transition-colors duration-300 ${
                  isActive('/') ? 'text-[#dec06a]' : 'text-gray-700 hover:text-[#dec06a]'
                }`}
              >
                الرئيسية
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`text-md font-medium px-3 py-2 transition-colors duration-300 ${
                  isActive('/about') ? 'text-[#dec06a]' : 'text-gray-700 hover:text-[#dec06a]'
                }`}
              >
                من نحن
              </Link>
            </li>
            <li
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="flex items-center text-md font-medium px-3 py-2 text-gray-700 hover:text-[#dec06a] transition-colors duration-300">
                خدماتنا
                <svg
                  className={`w-4 h-4 mr-1 transition-transform duration-200 ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDropdownOpen && (
                <ul className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-xl py-2 z-20 border border-gray-200 transition-all duration-300">
                  {[
                    { label: 'أمراض القلب', path: '/cardiology' },
                    { label: 'العظام', path: '/orthopedics' },
                    { label: 'الأعصاب', path: '/neurology' },
                    { label: 'طب الأطفال', path: '/pediatrics' },
                    { label: 'النساء والولادة', path: '/gynecology' },
                  ].map(({ label, path }) => (
                    <li key={path}>
                      <Link
                        to={path}
                        className="block px-4 py-3 text-gray-700 hover:bg-[#f6eecd] hover:text-[#a58532] transition duration-200"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <Link
                to="/doctors"
                className={`text-md font-medium px-3 py-2 transition-colors duration-300 ${
                  isActive('/doctors') ? 'text-[#dec06a]' : 'text-gray-700 hover:text-[#dec06a]'
                }`}
              >
                أطباؤنا
              </Link>
            </li>
            <li>
              <Link
                to="/portfolio"
                className={`text-md font-medium px-3 py-2 transition-colors duration-300 ${
                  isActive('/portfolio') ? 'text-[#dec06a]' : 'text-gray-700 hover:text-[#dec06a]'
                }`}
              >
                معرض الأعمال
              </Link>
            </li>
          </ul>
        </div>

        {/* Buttons - will be positioned on the left side */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/appointment"
            className="bg-gradient-to-r from-[#a58532] to-[#dec06a] hover:from-[#8a6e2b] hover:to-[#c5a84d] text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg text-sm font-medium transition-all"
          >
            احجز موعد
          </Link>
        </div>

        {/* Hamburger for mobile */}
        <div className="md:hidden flex items-center">
          <button
            className="relative w-8 h-8 flex flex-col justify-between items-center"
            onClick={toggleMenu}
            aria-label="فتح القائمة"
          >
            <span className={`block w-full h-0.5 bg-[#dec06a] rounded transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-full h-0.5 bg-[#dec06a] rounded transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-full h-0.5 bg-[#dec06a] rounded transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: '72px' }}
      >
        <div className="h-full overflow-y-auto py-4 px-4">
          <ul className="space-y-2">
            {[
              { label: 'الرئيسية', path: '/' },
              { label: 'من نحن', path: '/about' },
              { label: 'أطباؤنا', path: '/doctors' },
              { label: 'معرض الأعمال', path: '/portfolio' },
            ].map(({ label, path }) => (
              <li key={path}>
                <Link
                  to={path}
                  className="block px-4 py-3 text-gray-800 hover:bg-[#f6eecd] hover:text-[#a58532] rounded-lg transition-colors duration-200 font-medium"
                  onClick={toggleMenu}
                >
                  {label}
                </Link>
              </li>
            ))}

            {/* Dropdown in mobile */}
            <li>
              <div
                className="flex justify-between items-center px-4 py-3 text-gray-800 hover:bg-[#f6eecd] hover:text-[#a58532] rounded-lg cursor-pointer font-medium"
                onClick={toggleDropdown}
              >
                <span>خدماتنا</span>
                <svg
                  className={`w-4 h-4 transform transition-transform duration-200 ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {isDropdownOpen && (
                <ul className="pl-6 mt-1 space-y-2">
                  {[
                    { label: 'أمراض القلب', path: '/cardiology' },
                    { label: 'العظام', path: '/orthopedics' },
                    { label: 'الأعصاب', path: '/neurology' },
                    { label: 'طب الأطفال', path: '/pediatrics' },
                    { label: 'النساء والولادة', path: '/gynecology' },
                  ].map(({ label, path }) => (
                    <li key={path}>
                      <Link
                        to={path}
                        className="block px-4 py-2.5 text-gray-700 hover:bg-[#f6eecd] hover:text-[#a58532] rounded-lg transition-colors duration-200 text-sm"
                        onClick={toggleMenu}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li className="pt-4 mt-2 border-t border-gray-100">
              <Link
                to="/appointment"
                className="block bg-gradient-to-r from-[#a58532] to-[#dec06a] hover:from-[#8a6e2b] hover:to-[#c5a84d] text-white px-4 py-3 rounded-lg text-center font-medium shadow-md transition-all duration-300"
                onClick={toggleMenu}
              >
                احجز موعد
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;