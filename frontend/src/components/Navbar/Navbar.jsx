import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import useGetProfile from "../../hooks/useFetchData";
import { authContext } from '../../context/AuthContext';
import { BASE_URL } from '../../config';

function Navbar()
{
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);

  const { user, dispatch } = useContext(authContext);
  const { data: userData, error } = useGetProfile(
    user ? `${BASE_URL}/users/me` : null
  );
  const location = useLocation();

  const profileUser = userData?.data?.data;
  const navigate = useNavigate();

  const handleLogout = () =>
  {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const toggleMenu = () =>
  {
    setIsOpen(!isOpen);
  };

  const scrollToHero = () =>
  {
    // If we're not on the home page, first navigate to home
    if (location.pathname !== '/')
    {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() =>
      {
        const heroElement = document.getElementById('hero');
        if (heroElement)
        {
          const offset = navbarHeight;
          const elementPosition = heroElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else
    {
      const heroElement = document.getElementById('hero');
      if (heroElement)
      {
        const offset = navbarHeight;
        const elementPosition = heroElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const scrollToSection = (sectionId, isMobile = false) =>
  {
    // If we're not on the home page, first navigate to home
    if (location.pathname !== '/')
    {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() =>
      {
        const element = document.getElementById(sectionId);
        if (element)
        {
          const offset = navbarHeight;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else
    {
      const element = document.getElementById(sectionId);
      if (element)
      {
        const offset = navbarHeight;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }

    // Close mobile menu if it's open
    if (isMobile)
    {
      toggleMenu();
    }
  };

  const getUserDisplayName = () =>
  {
    if (error) return user?.name?.split(' ')[0] || 'User';
    return user?.name?.split(' ')[0] || profileUser?.name?.split(' ')[0] || 'User';
  };

  useEffect(() =>
  {
    const updateNavbarHeight = () =>
    {
      const navbar = document.querySelector('#navbar');
      if (navbar)
      {
        setNavbarHeight(navbar.offsetHeight);
      }
    };

    updateNavbarHeight();
    window.addEventListener('resize', updateNavbarHeight);

    return () => window.removeEventListener('resize', updateNavbarHeight);
  }, []);

  useEffect(() =>
  {
    document.body.style.paddingTop = `${navbarHeight}px`;
  }, [navbarHeight]);

  return (
    <header id="navbar" className="fixed top-0 left-0 w-full bg-white shadow-md z-50 py-2 px-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* <div className="flex-shrink-0">
            <button onClick={scrollToHero} className="text-2xl font-bold focus:border-none text-gray-800 bg-transparent border-none hover:border-none hover:text-blue-500">TrackIt</button>
          </div> */}

          <div className="flex items-center justify-between max-w-lg">
            <button onClick={scrollToHero} className="text-3xl font-bold text-gray-800 transition-colors duration-300 bg-transparent border-none hover:border-none hover:text-blue-500 focus:outline-none">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">TrackIt</span>
            </button>
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 rounded-full bg-blue-500"></div>
              <div className="h-8 w-8 rounded-full bg-purple-500"></div>
            </div>
          </div>

          {/* Hamburger menu */}
          <div className="sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex bg-transparent items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              aria-expanded={isOpen}
            >
              <div className="space-y-2">
                <span className={`block w-8 h-0.5 bg-current transform transition duration-300 ${isOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                <span className={`block w-8 h-0.5 bg-current transition duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-8 h-0.5 bg-current transform transition duration-300 ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
              </div>
            </button>
          </div>

          {/* Desktop menu */}
          <nav className="hidden sm:flex sm:items-center sm:space-x-8">
            <button onClick={scrollToHero} className="text-gray-700 bg-transparent border-none hover:border-none hover:text-blue-500">Home</button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-gray-700 focus:border-none focus:text-blue-400 bg-transparent border-none hover:border-none hover:text-blue-500"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-gray-700 focus:ring-0 focus:border-none bg-transparent border-none hover:border-none hover:text-blue-500"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 bg-transparent border-none hover:border-none hover:text-blue-500"
            >
              Contact
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
                >
                  <span>{getUserDisplayName()}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {isDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Link
                      to="/me"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex  hover:text-white items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Login
              </Link>
            )}
          </nav>
        </div>

        {/* Mobile menu */}
        <div className={`sm:hidden ${isOpen ? 'block' : 'hidden'}`}>
          <div className="pt-2 pb-3 space-y-1">
            <button
              onClick={() =>
              {
                scrollToHero();
                toggleMenu();
              }}
              className="block w-full text-left px-3 py-2 text-gray-700 focus:border-none focus:text-blue-400 bg-transparent border-none hover:border-none hover:text-blue-500"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('features', true)}
              className="block w-full text-left px-3 py-2 text-gray-700 focus:border-none focus:text-blue-400 bg-transparent border-none hover:border-none hover:text-blue-500"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('pricing', true)}
              className="block w-full text-left px-3 py-2 text-gray-700 focus:border-none focus:text-blue-400 bg-transparent border-none hover:border-none hover:text-blue-500"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('contact', true)}
              className="block w-full text-left px-3 py-2 text-gray-700 focus:border-none focus:text-blue-400 bg-transparent border-none hover:border-none hover:text-blue-500"
            >
              Contact
            </button>

            {user ? (
              <>
                <Link
                  to="/me"
                  className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={toggleMenu}
                >
                  Profile
                </Link>
                <button
                  onClick={() =>
                  {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Log out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white "
                onClick={toggleMenu}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;