import i18next from 'i18next';
import parser from './parser';
import render from './render';
import watchedState from './state';

const getFeed = async (url) => {
  const bodyEl = document.querySelector('.body');
  await fetch(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
    .then((response) => {
      if (response.ok) {
      console.log('444444444444444444444', response);
        watchedState.feeds.push(url);
        return response.json();
      }
      console.log('33333333333333333333', response);
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
      console.log('22222222222222222222', data);
      parser(watchedState, data.contents);
    })
    .then(() => render(watchedState))
    .catch((error) => {
      const inputEl = document.querySelector('#floatingInput');
      const divWithStatusEl = document.querySelector('.status');
      divWithStatusEl.classList.add('is-invalid');
      inputEl.classList.add('is-invalid');
      console.warn('111111111111111111111111', `1${error}1`);
      if (error == 'TypeError: Failed to fetch') {
        divWithStatusEl.innerText = i18next.t('network', { lng: watchedState.locale });
      } else {
        divWithStatusEl.innerText = i18next.t('rss.rss_not_valid', { lng: watchedState.locale });
      }
    });
};

export default getFeed;
