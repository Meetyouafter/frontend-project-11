import watchedState from './state';
import {parser} from './parser';
import renderFeed from './renderFeed';

const bodyEl = document.querySelector('.body');

const getFeed = async (url) => {
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
    .then((data) => parser(data))
    .then((content) => renderFeed(content));
};

export default getFeed;
