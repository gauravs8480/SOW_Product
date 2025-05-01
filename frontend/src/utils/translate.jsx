// src/utils/translate.js
import axios from 'axios';

/**
 * Translates the given text using Google Translate API
 * @param {string} text - Text to translate
 * @param {string} targetLang - Target language code (default is 'sv')
 * @returns {Promise<string>} - Translated text or original text if failed
 */
export async function translateText(text, targetLang = 'sv') {
  if (!text || typeof text !== 'string') return '';

  const apiKey = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;
  if (!apiKey) {
    console.warn('⚠️ Google Translate API key is missing.');
    return text;
  }

  try {
    const response = await axios.post(
      'https://translation.googleapis.com/language/translate/v2',
      {},
      {
        params: {
          q: text,
          target: targetLang,
          format: 'text',
          key: apiKey,
        },
      }
    );

    return response.data.data.translations?.[0]?.translatedText || text;
  } catch (error) {
    console.error('❌ Translation failed:', error.message || error);
    return text;
  }
}
