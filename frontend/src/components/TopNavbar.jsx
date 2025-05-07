import { useState } from 'react';
import { Flag1, Flag2 } from '../assets/Index';
import LayoutWrapper from '../constants/LayoutWrapper';

const TopNavbar = () => {
  const [currentLang, setCurrentLang] = useState('en');

  // Function to toggle language (if needed in future)
  const toggleLanguage = () => {
    setCurrentLang(currentLang === 'en' ? 'sv' : 'en');
  };

  return (
    <div className="flex justify-between items-center bg-blue-500 px-6 py-3 text-white shadow-md">
      <div className="relative flex items-center mx-30 gap-3">
        <div className="relative">
          <img src={Flag1} className="object-cover w-10 h-10 rounded-full" alt="" />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
        </div>
        <div className="text-center ml-2">
          <h1 className="font-bold text-lg">John Andre</h1>
          <p className="text-sm opacity-80">Storfjord AS</p>
        </div>
      </div>

      <div className="flex items-center mx-30 gap-3">
        <img
          src={currentLang === 'sv' ? Flag2 : Flag1}
          alt={`Flag for ${currentLang}`}
          className="w-6 h-4 rounded shadow cursor-pointer"
          onClick={toggleLanguage}
        />
        <span className="text-white">{currentLang === 'sv' ? 'Svenska' : 'English'}</span>
      </div>
    </div>
  );
};

export default TopNavbar;
