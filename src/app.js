import parser from './parser';
import render from './render';
import watchedState from './state';

const app = async (url) => {
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
    .then((data) => parser(data.contents))
    .then(() => render(watchedState))
    .catch((error) => console.error(error));
};

export default app;
