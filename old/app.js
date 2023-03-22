import 'bootstrap';
import axios from 'axios';
import i18next from 'i18next';
import watcher from './watcher.js';
import parser from './services/parser.js';
import getParseFeedData from './data/getFeedData.js';
import render from './render/render.js';
import ru from './services/translate/locales/ru.json';
import en from './services/translate/locales/en.json';
import { inputSchema, repeatSchema } from './services/validation.js';

const inputEl = document.querySelector('#floatingInput');
const divWithStatusEl = document.querySelector('.status');
const formEl = document.querySelector('.form');

const getRss = async (url, watchedState, i18n) => {
  console.log({url})
  await fetch(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
    .then((response) => {
      console.log({response})

      if (response.ok) {
        watchedState.feeds.push(url);
        console.log({watchedState})
        return response.json();
      }
      console.log(watchedState)

      const bodyEl = document.querySelector('.body');
      const h1El = document.createElement('h1');
      h1El.innerText = i18n.t('network', { lng: watchedState.locale });
      bodyEl.prepend(h1El);
      throw new Error(i18n.t('network', { lng: watchedState.locale }));
    })
    .then((data) => {
      if (data.http_code === 404) {
        watchedState.feeds.pop();
        return;
      }
      const parseData = parser(data.contents);
      getParseFeedData(watchedState, parseData);
    })
    .then(() => render(watchedState))
    .catch((error) => {
      divWithStatusEl.classList.add('is-invalid');
      inputEl.classList.add('is-invalid');
      if (String(error) === 'TypeError: Failed to fetch') {
        divWithStatusEl.innerText = i18n.t('network', { lng: watchedState.locale });
      } else {
        divWithStatusEl.innerText = i18n.t('rss.rss_not_valid', { lng: watchedState.locale });
      }
    });
};

const getData = (watchedState, i18n) => {
  formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    const data = { feeds: url };
    console.log({data})
    try {
      await inputSchema.validate(data);
      await repeatSchema(watchedState.feeds).validate(data.feeds);
      getRss(data.feeds, watchedState, i18n);
      divWithStatusEl.innerText = i18n.t('rss.rss_done', { lng: watchedState.locale });
      divWithStatusEl.classList.remove('is-invalid');
      inputEl.classList.remove('is-invalid');
      inputEl.value = '';
      inputEl.focus();
    } catch (err) {
      divWithStatusEl.innerText = 'rrrrr'; //  i18n.t(err.errors, { lng: watchedState.locale });
      divWithStatusEl.classList.add('is-invalid');
      inputEl.classList.add('is-invalid');
    }
  });
};

const updateRss = (watchedState) => {
  const proxy = 'https://allorigins.hexlet.app/get?disableCache=true&url=';
  const promises = watchedState.contents.map((resource) => axios.get(`${proxy}${resource}`)
    .then((response) => parser(response))
    .catch((error) => {
      switch (error.name) {
        default:
          throw new Error();
      }
    }));

  Promise.all(promises)
    .then((rss) => {
      console.log({ rss });
      watchedState.contents.push(rss);
    });
  setTimeout(() => updateRss(watchedState), 5000);
};

export default () => {
  const i18n = i18next.createInstance();
  i18n.init({
    lng: 'ru',
    debug: true,
    resources: {
      ru,
      en,
    },
  });

  const state = {
    locale: 'ru',
    feeds: [],
    content: [],
    newPosts: [],
    uiState: {
      readedPost: [],
      modalWindow: '',
    },
  };

  console.log(3);

  const watchedState = watcher(state, i18n);
  getData(watchedState, i18n);
  updateRss(watchedState);
};
