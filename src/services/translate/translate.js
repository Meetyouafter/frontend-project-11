import i18next from 'i18next';
import { watchedState } from '../../render/render.js';
import en from './locales/en.json';
import ru from './locales/ru.json';

const elementClasses = ['title', 'description', 'example', 'language', 'button', 'label', 'status'];

i18next.init({
  lng: watchedState.locale,
  resources: {
    en,
    ru,
  },
});

const changeLanguage = (language, error) => {
  elementClasses.forEach((element) => {
    const domEl = document.querySelector(`.${element}`);
    if (element === 'status') {
      if (error === 'complete') {
        domEl.innerText = i18next.t('rss_done', { lng: language });
      } else {
        domEl.innerText = i18next.t(error, { lng: language });
      }
    } else {
      domEl.innerText = i18next.t(`interface.${element}`, { lng: language });
    }
  });
};

export default changeLanguage;
