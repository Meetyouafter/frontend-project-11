/* eslint-disable no-restricted-syntax */
import modalButton from './modalWindow/modalButton';
import modalWindow from './modalWindow/modalWindow';
import watchedState from './state';
import readPost from './helper';
import { feedsEl, contentEl } from './domModify';

const Parser = new DOMParser();

const bodyEl = document.querySelector('.body');

const getFeed = async (url) => {
  watchedState.contents = []
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
    .then((data) => watchedState.contents.push(data));
};

const getContent = async (url) => {
  await fetch(url, {
    method: 'GET',
    mode: 'no-cors',
  })
    .then((response) => Parser.parseFromString(response, 'text/html'))
    .then((data) => console.log('con', data));
};

const getPromises = async () => {
  const promises = await getContent();
  // Promise.all(promises).map((promise) => {
  //   (console.log(promise))
  // })
  // // .then((content) => console.log(content))
  //   .then((response) => console.log(response))
  // //  .then((data) => Parser.parseFromString(data, 'text/html'))
  //   .then((content) => console.log(content));
};


export { getFeed, getContent, getPromises };
