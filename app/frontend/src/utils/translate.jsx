// src/utils/translate.js
import axios from 'axios';

/**
 * Translate given text using LibreTranslate
 * @param {string} text - The text to translate
 * @param {string} targetLang - Target language code (e.g., 'sv', 'hi', 'es')
 * @returns {Promise<string>} Translated string
 */
export async function translateText(text, targetLang = 'sv') {
  if (!text || typeof text !== 'string') return '';

  try {
    const response = await axios.post(
      'https://libretranslate.de/translate',
      {
        q: text,
        source: 'en',
        target: targetLang,
        format: 'text',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data?.translatedText || text;
  } catch (error) {
    console.error('❌ LibreTranslate failed:', error.message || error);
    return text; // fallback to original
  }
}
