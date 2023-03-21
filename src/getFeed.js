import i18next from 'i18next';
import render, { watchedState } from './render.js';
import parser from './parser.js';
import getFeedData from './data/getFeedData.js';

const getElForNetworkErr = () => {
  const bodyEl = document.querySelector('.body');
  const h1El = document.createElement('h1');
  h1El.innerText = i18next.t('network', { lng: watchedState.locale });
  bodyEl.prepend(h1El);
  throw new Error(i18next.t('network', { lng: watchedState.locale }));
};

const getErrorsForFeed = (error) => {
  const inputEl = document.querySelector('#floatingInput');
  const divWithStatusEl = document.querySelector('.status');
  divWithStatusEl.classList.add('is-invalid');
  inputEl.classList.add('is-invalid');
  if (String(error) === 'TypeError: Failed to fetch') {
    divWithStatusEl.innerText = i18next.t('network', { lng: watchedState.locale });
  } else {
    divWithStatusEl.innerText = i18next.t('rss.rss_not_valid', { lng: watchedState.locale });
  }
};

const getFeed = async (url) => {
  await fetch(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
    .then((response) => {
      if (response.ok) {
        watchedState.feeds.push(url);
        return response.json();
      }
      return getElForNetworkErr();
    })
    .then((data) => {
      if (data.http_code === 404) {
        watchedState.feeds.pop();
        return;
      }
      const parseData = parser(data.contents);
      getFeedData(watchedState, parseData);
    })
    .then(() => render(watchedState))
    .catch((error) => {
      getErrorsForFeed(error);
    });
};

export default getFeed;
