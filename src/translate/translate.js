import i18next from 'i18next';
import { watchedState } from '../render.js';
import en from './locales/en.json';
import ru from './locales/ru.json';

i18next.init({
  lng: watchedState.locale,
  resources: {
    en,
    ru,
  },
});

const changeLanguage = (language, err) => {
  const title = document.querySelector('.title');
  title.innerText = i18next.t('interface.title', { lng: language });

  const description = document.querySelector('.description');
  description.innerText = i18next.t('interface.description', { lng: language });

  const example = document.querySelector('.example');
  example.innerText = i18next.t('interface.example', { lng: language });

  const btn = document.querySelector('.btn-primary');
  btn.innerText = i18next.t('interface.button', { lng: language });

  const input = document.querySelector('label');
  input.innerText = i18next.t('interface.input', { lng: language });

  const languageChoise = document.querySelector('.language');
  languageChoise.innerText = i18next.t('interface.choiseLang', { lng: language });

  const status = document.querySelector('.status');

  const getStatus = () => {
    if (err === 'complete') {
      status.innerText = i18next.t('rss_done', { lng: language });
    } else {
      status.innerText = i18next.t(err, { lng: language });
    }
  };

  getStatus();
};

export default changeLanguage;
