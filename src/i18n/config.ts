import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import fr from './fr.json';
import en from './en.json';

i18n
	.use(LanguageDetector) // Détecte la langue du système automatiquement
	.use(initReactI18next)
	.init({
		fallbackLng: 'en',
		resources: {
			fr: { translation: fr },
			en: { translation: en },
		},
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;