/* eslint-disable no-restricted-syntax */
import modalButton from './modalWindow/modalButton';
import modalWindow from './modalWindow/modalWindow';
import watchedState from './state';
import readPost from './helper';
import { feedsEl, contentEl } from './domModify';

const Parser = new DOMParser();

const bodyEl = document.querySelector('.body');
const feeds = [];

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
    });
};
/*
const getPosts = async () => {
  await watchedState.feeds.map((feed) => {
    const r = 1 + 2;
    return r + feed;
  });
};
*/
/*
watchedState.feeds.forEach((feed) => {
  const posts = new Promise((resolve, reject) => {
    fetch(feed)
    .then(console.log('ok', resolve))
    .catch(console.log('not ok', reject));
  });
});
*/
const getPosts = () => {
  watchedState.feeds.forEach((feed) => {
    const response = fetch(feed, {
      method: 'GET',
      mode: 'no-cors',
    });
    console.log(response);
    return response;
  });
}

export { getFeed, getPosts };


/*
    .then((data) => Parser.parseFromString(data.contents, 'text/html'))
    .then((content) => {
      watchedState.contents.push(content);

      const itemsArray = Array.from(content.querySelectorAll('item'));
      const titlesArray = Array.from(content.querySelectorAll('title'));
      const descriptionsArray = Array.from(content.querySelectorAll('description'));

      itemsArray.forEach((el) => {
        const nodes = [...el.childNodes]
          .filter((el1) => el1 instanceof Text)
          .filter((el2) => el2.textContent.trim() !== '');
        watchedState.links.push(nodes[0].data);
      });
    })
    .catch((err) => {
      const h1El = document.createElement('h1');
      h1El.textContent = err;
      bodyEl.prepend(h1El);
      throw new Error(err);
    });
*/