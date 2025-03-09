import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {ruLocalization} from './elements/ru';

i18n
  .use(initReactI18next)
  .init({
    resources: {
        ru: ruLocalization,
    },
    lng: "ru",
    fallbackLng: "ru",
    interpolation: {
      escapeValue: false
    }
  });
