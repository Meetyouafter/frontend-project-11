import i18next from 'i18next';
import { inputSchema } from './validation';
import changeLanguage from './translate';
import { state, watchedState } from './state';
import './style.css';
import getFeed from './getFeed';
import axios from 'axios';
import * as yup from 'yup';
import mutationObserver from './observer';
import observer from './observer';

const inputEl = document.querySelector('#floatingInput');
const divWithStatusEl = document.querySelector('.status');
const formEl = document.querySelector('.form');
const bodyEl = document.querySelector('.body');

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

    /*
    axios.get(data.feeds)
    .then(function (response) {
    response.header("Access-Control-Allow-Origin", "*")

    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
*/

    getFeed(data.feeds);
    observer(watchedState.feeds, watchedState.contents);
  } catch (err) {
    divWithStatusEl.innerText = i18next.t(err.errors, { lng: watchedState.locale });
    changeLanguage(watchedState.locale, err.errors);
    divWithStatusEl.classList.add('is-invalid');
    inputEl.classList.add('is-invalid');
  }
});

const ButtonToEnLangEl = document.querySelector('.btn_enLang');
const ButtonToRuLangEl = document.querySelector('.btn_ruLang');

ButtonToEnLangEl.addEventListener('click', () => {
  watchedState.locale = 'en';
  changeLanguage(watchedState.locale);
});

ButtonToRuLangEl.addEventListener('click', () => {
  watchedState.locale = 'ru';
  changeLanguage(watchedState.locale);
});

const ButtonTest = document.querySelector('.test');
ButtonTest.addEventListener('click', () => {
  const contentEl = document.createElement('div');
  contentEl.classList.add('col-8', 'content');
  contentEl.innerText = 'Content';

  const feedsEl = document.createElement('div');
  feedsEl.classList.add('col-4', 'feeds');
  feedsEl.innerText = 'Feeds';

  bodyEl.prepend(contentEl);
  bodyEl.append(feedsEl);
});
