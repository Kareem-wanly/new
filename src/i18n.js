import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: "ar", // Set the default language to Arabic
    debug: false, // Set to true to enable i18next debugging
    interpolation: {
      escapeValue: false, // React already escapes variables
    },
    // backend: {
    //   loadPath: "/locales/{{lng}}/{{ns}}.json", // Change the path if necessary
    // },
  });

export default i18n;
