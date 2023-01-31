/* eslint-disable no-restricted-syntax */
import modalButton from './modalWindow/modalButton';
import modalWindow from './modalWindow/modalWindow';
import watchedState from './state';
import readPost from './helper';
import { feedsEl, contentEl } from './domModify';

const Parser = new DOMParser();

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
/*
const getContents = async () => {
  let key = 0;
  watchedState.feeds.forEach(async (feed) => {
    const response = await fetch(feed, {
      method: 'GET',
      mode: 'no-cors',
    })
    .then((response) => response.json())
    .then((data => {
      const content = Parser.parseFromString(data, 'text/html');
      watchedState.data[key += 1] = { content };
  
  
      const itemsArray = Array.from(content.querySelectorAll('item'));
      const titlesArray = Array.from(content.querySelectorAll('title'));
      const descriptionsArray = Array.from(content.querySelectorAll('description'));
  console.log('content', content)
  console.log('itemsArray', itemsArray)
      itemsArray.forEach((el) => {
      const links = [];
        const nodes = [...el.childNodes]
          .filter((el1) => el1 instanceof Text)
          .filter((el2) => el2.textContent.trim() !== '');
        links.push(nodes[0].data);
        watchedState.data[key += 1] = { links };
      });
      // links.unshift('empty link');
    }))
  });
};
*/
const getContents = () => 0
const getPosts = () => {
  const elele = (watchedState.data);
  console.log('elele', elele);
  for (let el in watchedState.data) {
    console.log('el', el)
  }
  /*
  elele.forEach((element) => {
    const itemsArray = Array.from(element.content.querySelectorAll('item'));
    const titlesArray = Array.from(element.content.querySelectorAll('title'));
    const descriptionsArray = Array.from(element.content.querySelectorAll('description'));
  });
  */
};

export { getFeed, getContents, getPosts };

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
