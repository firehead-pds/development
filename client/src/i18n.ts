import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';

i18next
  .use(Backend)
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
      backend: {
        loadPath: "../public/locales/{{lng}}/{{ns}}.json"
      }
  })
  .then();

export default i18next;
