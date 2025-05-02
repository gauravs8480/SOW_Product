import { useEffect, useState } from 'react';
import { Flag1, Flag2 } from '../assets/Index';
import LayoutWrapper from '../constants/LayoutWrapper';

const TopNavbar = () => {
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    // Inject Google Translate script
    const existingScript = document.getElementById('google-translate');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'google-translate';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(script);

      // Define global init function (Google calls this)
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,sv',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          'google_translate_element'
        );
      };
    }

    // Observe dropdown for language change
    const observer = new MutationObserver(() => {
      const langSelect = document.querySelector('.goog-te-combo');
      if (langSelect) {
        setCurrentLang(langSelect.value);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return (




    <div className="flex justify-between items-center bg-blue-500 px-6 py-3 text-white shadow-md  ">



  
 
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
        <div
          id="google_translate_element"
          className="text-black bg-white px-2 py-1 rounded"
        ></div>

        <img
          src={currentLang === 'sv' ? Flag2 : Flag1}
          alt={`Flag for ${currentLang}`}
          className="w-6 h-4 rounded shadow"
        />
      </div>




    </div>


  );
};

export default TopNavbar;
