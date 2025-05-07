import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const TermsandCondition = () => {
  const { language } = useLanguage(); // 'en' or 'sv'
  const navigate = useNavigate();

  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTerms = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `http://localhost:3001/api/terms?lang=${language}`
      );
      setTerms(response.data);
    } catch (err) {
      console.error('❌ Error fetching terms:', err);
      setError('⚠️ Failed to load terms. Please try again.');
      setTerms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTerms();
  }, [language]);

  return (
    <div
      className="min-h-screen bg-cover bg-center px-6 py-1"
      style={{
        backgroundImage:
          "url('https://storage.123fakturera.se/public/wallpapers/sverige43.jpg')",
      }}
    >
      <Navbar />

      <div className="text-center">
        <button
          onClick={() => navigate(-1)}
          className="mt-10 mb-10 px-6 py-2 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-md transition"
        >
          {language === 'sv' ? 'Stäng och gå tillbaka' : 'Close and Go Back'}
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white/80 p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">
          {language === 'sv' ? 'Villkor' : 'Terms & Conditions'}
        </h1>

        {loading ? (
          <p className="text-center text-gray-600">🔄 Loading terms...</p>
        ) : error ? (
          <div className="text-center text-red-500">
            <p>{error}</p>
            <button
              onClick={fetchTerms}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Retry
            </button>
          </div>
        ) : terms.length > 0 ? (
          <div className="h-[400px] overflow-y-auto pr-4 mb-6">
            {terms.map((term, index) => (
              <p
                key={index}
                className="mb-2 text-base text-center leading-relaxed text-black"
              >
                {term.text}
              </p>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            🚫 No terms found for the selected language.
          </p>
        )}
      </div>

      <div className="text-center mt-4">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-md transition"
        >
          {language === 'sv' ? 'Stäng och gå tillbaka' : 'Close and Go Back'}
        </button>
      </div>
    </div>
  );
};

export default TermsandCondition;
