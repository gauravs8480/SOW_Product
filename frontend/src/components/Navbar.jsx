import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { navLinks } from '../constants';
import { Logo, Flag1, Flag2 } from '../assets/Index';
import LayoutWrapper from '../constants/LayoutWrapper';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const { language, toggleLanguage } = useLanguage();
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleLanguageChange = (lang) => {
    if (lang !== language) {
      toggleLanguage(lang);
    }
    setOpenDropdown(false);
  };

  const translate = (textEn, textSv) => (language === 'sv' ? textSv : textEn);

  const translatedNavLinks = navLinks.map((link) => {
    const translations = {
      Home: translate('Home', 'Hem'),
      Order: translate('Order', 'Beställning'),
      'Our Customers': translate('Our Customers', 'Våra kunder'),
      'About Us': translate('About Us', 'Om oss'),
      'Contact Us': translate('Contact Us', 'Kontakta oss')
    };
    return {
      ...link,
      title: translations[link.title] || link.title
    };
  });

  return (
    <LayoutWrapper>
      <div id="google_translate_element" className="text-black bg-transparent relative z-[1]">
        <nav className="w-full flex py-6 justify-between items-center relative">
          {/* Logo */}
          <div className="flex items-center">
            <img src={Logo} alt="logo" className="w-[50px] h-[32px]" />
          </div>

          {/* Nav Links + Language Toggle */}
          <div className="flex-1 flex justify-end items-center gap-4">
            <ul className="list-none sm:flex hidden justify-end items-center flex-1">
              {translatedNavLinks.map((nav) => (
                <li
                  key={nav.id}
                  className="font-normal cursor-pointer text-[16px] mr-10 text-black hover:underline"
                >
                  <Link to={`/${nav.id}`}>{nav.title}</Link>
                </li>
              ))}
              <li className="font-normal cursor-pointer text-[16px] mr-10 text-black hover:underline">
                <Link to="/pricelist">{translate('Price List', 'Prislista')}</Link>
              </li>
            </ul>

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(!openDropdown)}
                className="flex items-center gap-2 text-black border border-gray-300 px-3 py-1 rounded hover:bg-gray-100"
              >
                <span>{translate('English', 'Svenska')}</span>
                <img
                  src={language === 'sv' ? Flag2 : Flag1}
                  alt={language}
                  className="w-5 h-5"
                />
              </button>

              {openDropdown && (
                <div className="absolute right-0 mt-2 w-36 bg-white shadow-md rounded-md py-2 z-50">
                  <div
                    className={`flex items-center gap-2 cursor-pointer px-4 py-2 hover:bg-gray-100 ${language === 'sv' ? 'font-bold' : ''}`}
                    onClick={() => handleLanguageChange('sv')}
                  >
                    <img src={Flag2} className="w-4 h-4" alt="svenska" />
                    Svenska
                  </div>
                  <div
                    className={`flex items-center gap-2 cursor-pointer px-4 py-2 hover:bg-gray-100 ${language === 'en' ? 'font-bold' : ''}`}
                    onClick={() => handleLanguageChange('en')}
                  >
                    <img src={Flag1} className="w-4 h-4" alt="english" />
                    English
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </LayoutWrapper>
  );
};

export default Navbar;
