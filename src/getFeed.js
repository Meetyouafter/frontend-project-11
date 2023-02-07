import i18next from 'i18next';
import parser from './parser.js';
import render, { watchedState } from './render.js';

const getFeed = async (url) => {
  const bodyEl = document.querySelector('.body');
  await fetch(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
    .then((response) => {
      if (response.ok) {
        watchedState.feeds.push(url);
        return response.json();
      }
      const h1El = document.createElement('h1');
      h1El.innerText = i18next.t('network', { lng: watchedState.locale });
      bodyEl.prepend(h1El);
      throw new Error('Ответ сети был не ok.');
    })
    .then((data) => {
      if (data.http_code === 404) {
        watchedState.feeds.pop();
        return;
      }
      parser(watchedState, data.contents);
    })
    .then(() => render(watchedState))
    .catch((error) => {
      const inputEl = document.querySelector('#floatingInput');
      const divWithStatusEl = document.querySelector('.status');
      divWithStatusEl.classList.add('is-invalid');
      inputEl.classList.add('is-invalid');
      if (String(error) === 'TypeError: Failed to fetch') {
        divWithStatusEl.innerText = i18next.t('network', { lng: watchedState.locale });
      } else {
        divWithStatusEl.innerText = i18next.t('rss.rss_not_valid', { lng: watchedState.locale });
      }
    });
};

export default getFeed;
