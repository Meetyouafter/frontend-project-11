import i18next from 'i18next';
import { inputSchema, repeatSchema } from './validation.js';
import changeLanguage from './translate/translate.js';
import getFeed from './getFeed.js';
import { watchedState } from './render.js';
import observer from './observer.js';

const getInitialRender = () => {
  const inputEl = document.querySelector('#floatingInput');
  const divWithStatusEl = document.querySelector('.status');
  const formEl = document.querySelector('.form');
  const buttonToEnLangEl = document.querySelector('.btn_enLang');
  const buttonToRuLangEl = document.querySelector('.btn_ruLang');

  buttonToEnLangEl.addEventListener('click', () => {
    watchedState.locale = 'en';
    changeLanguage(watchedState.locale);
  });

  buttonToRuLangEl.addEventListener('click', () => {
    watchedState.locale = 'ru';
    changeLanguage(watchedState.locale);
  });

  formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    const data = { feeds: url };
    try {
      await inputSchema.validate(data);
      await repeatSchema(watchedState.feeds).validate(data.feeds);
      divWithStatusEl.innerText = i18next.t('rss.rss_done', { lng: watchedState.locale });
      divWithStatusEl.classList.remove('is-invalid');
      inputEl.classList.remove('is-invalid');
      inputEl.value = '';
      inputEl.focus();
      getFeed(data.feeds);
      observer(watchedState);
    } catch (err) {
      divWithStatusEl.innerText = i18next.t(err.errors, { lng: watchedState.locale });
      changeLanguage(watchedState.locale, err.errors);
      divWithStatusEl.classList.add('is-invalid');
      inputEl.classList.add('is-invalid');
    }
  });
};

export default getInitialRender;
