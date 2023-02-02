import i18next from 'i18next';
import parser from './parser';
import render from './render';
import watchedState from './state';

const getFeed = async (url) => {
  const bodyEl = document.querySelector('.body');
  await fetch(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
    .then((response) => {
      if (response.ok) {
        watchedState.feeds.push(url);
        return response.json();
      }
      const h1El = document.createElement('h1');
      h1El.textContent = 'Что-то пошло не так';
      bodyEl.prepend(h1El);
      throw new Error('Network response was not ok.');
    })
    .then((data) => parser(watchedState, data.contents))
    .then(() => render(watchedState))
    .catch(() => {
      const inputEl = document.querySelector('#floatingInput');
      const divWithStatusEl = document.querySelector('.status');
      divWithStatusEl.classList.add('is-invalid');
      inputEl.classList.add('is-invalid');
      divWithStatusEl.innerText = i18next.t('rss.rss_not_valid', { lng: watchedState.locale });
    });
};

export default getFeed;
