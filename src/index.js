import i18next from 'i18next';
import * as yup from 'yup';
import inputSchema from './validation';
import changeLanguage from './translate/translate';
import watchedState from './state';
import './style.css';
import getFeed from './getFeed';
import observer from './observer';

const inputEl = document.querySelector('#floatingInput');
const divWithStatusEl = document.querySelector('.status');
const formEl = document.querySelector('.form');

formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = { feeds: inputEl.value };
  try {
    await inputSchema.validate(data);
    await yup.mixed().notOneOf(watchedState.feeds).validate(data.feeds);
    divWithStatusEl.innerText = i18next.t('rss.rss_done', { lng: watchedState.locale });
    watchedState.feeds.push(data.feeds);
    divWithStatusEl.classList.remove('is-invalid');
    inputEl.classList.remove('is-invalid');
    inputEl.value = '';
    inputEl.focus();

    getFeed(data.feeds);
    observer(watchedState.feeds, watchedState.contents);
  } catch (err) {
    divWithStatusEl.innerText = i18next.t(err.errors, { lng: watchedState.locale });
    changeLanguage(watchedState.locale, err.errors);
    divWithStatusEl.classList.add('is-invalid');
    inputEl.classList.add('is-invalid');
  }
});
