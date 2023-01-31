/* eslint-disable no-restricted-syntax */
import modalButton from './modalWindow/modalButton';
import modalWindow from './modalWindow/modalWindow';
import watchedState from './state';
import readPost from './helper';
import { feedsEl, contentEl } from './domModify';

const Parser = new DOMParser();

const bodyEl = document.querySelector('.body');
const feeds = [];

const getFeed = (url) => {
  fetch(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
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
    .then((data) => console.log(data, 'text/html'))
    .then((data) => Parser.parseFromString(data.contents, 'text/html'))
    .then((content) => {
      console.log('content', content);
      console.log('state', watchedState);

      watchedState.contents.push(content);

      const itemsArray = Array.from(content.querySelectorAll('item'));
      const titlesArray = Array.from(content.querySelectorAll('title'));
      const descriptionsArray = Array.from(content.querySelectorAll('description'));

      const links = [];
      itemsArray.forEach((el) => {
        const nodes = [...el.childNodes]
          .filter((el1) => el1 instanceof Text)
          .filter((el2) => el2.textContent.trim() !== '');
        links.push(nodes[0].data);
      });
      links.unshift('empty link');

      for (let i = 0; i < titlesArray.length; i += 1) {
        feeds[i] = {
          title: titlesArray[i],
          description: descriptionsArray[i],
          link: links[i],
          index: i,
        };
      }

      for (let i = 0; i < feeds.length; i += 1) {
        const boxEl = document.createElement('div');
        const h2El = document.createElement('h2');
        const h3El = document.createElement('h3');
        const linkEl = document.createElement('a');

        linkEl.setAttribute('target', '_blank');
        boxEl.classList.add('postBox');
        linkEl.classList.add('fw-bold');

        if (i === 0) {
          h2El.innerHTML = feeds[i].title.innerHTML;
          h3El.innerHTML = feeds[i].description.innerHTML;
          feedsEl.append(h2El);
          feedsEl.append(h3El);
          bodyEl.append(feedsEl);
        } else {
          linkEl.textContent = feeds[i].title.textContent;
          linkEl.href = feeds[i].link;

          if (!watchedState.posts.includes(feeds[i].title.textContent)) {
            watchedState.posts.push(feeds[i].title.textContent);
          }
          if (!watchedState.uiState.posts.includes({ title: feeds[i].title.textContent, readed: false })) {
            watchedState.uiState.posts.push({ title: feeds[i].title.textContent, readed: false });
          }

          linkEl.addEventListener('click', () => readPost(linkEl));

          contentEl.append(boxEl);
          boxEl.append(linkEl);
          boxEl.append(modalButton(`postModal-${url}-${i}`));
          boxEl.append(modalWindow(`postModal-${url}-${i}`, feeds[i].title.innerHTML, feeds[i].description.innerHTML, feeds[i].link));
          bodyEl.prepend(contentEl);
        }
      }
    })
    .catch((err) => {
      const h1El = document.createElement('h1');
      h1El.textContent = err;
      bodyEl.prepend(h1El);
      throw new Error(err);
    });
};

export default getFeed;
