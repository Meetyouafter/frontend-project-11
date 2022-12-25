import { state } from './state';

const Parser = new DOMParser();

const bodyEl = document.querySelector('.body');
const feeds = [];

const contentEl = document.createElement('div');
contentEl.classList.add('col-8', 'content');

const feedsEl = document.createElement('div');
feedsEl.classList.add('col-4', 'feeds');

const firstRss = '';

const getFeed = (url) => {
  fetch(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
    .then((response) => {
      if (response.ok) {
        state.feeds.push(url);
        return response.json();
      }
      const h1El = document.createElement('h1');
      h1El.innerText = 'Что-то пошло не так';
      bodyEl.prepend(h1El);
      throw new Error('Network response was not ok.');
    })
    .then((data) => Parser.parseFromString(data.contents, 'text/html'))
    .then((content) => {
      console.log(content);
      console.log(state);
      state.contents.push(content);
      const feedTitles = content.querySelectorAll('title');
      const feedDescriptions = content.querySelectorAll('description');

      const titlesArray = Array.from(feedTitles);
      const descriptionsArray = Array.from(feedDescriptions);

      for (let i = 0; i < titlesArray.length; i++) {
        feeds[i] = {
          title: titlesArray[i],
          description: descriptionsArray[i],
          index: i,
        };
      }

      console.log(feeds);

      for (let i = 0; i < feeds.length; i += 1) {
        const boxEl = document.createElement('div');
        const h1El = document.createElement('h1');
        const pEl = document.createElement('p');
        const h2El = document.createElement('h2');
        const h3El = document.createElement('h3');

        if (i === 0) {
          h2El.innerHTML = feeds[i].title.innerHTML;
          h3El.innerHTML = feeds[i].description.innerHTML;
          feedsEl.prepend(h2El);
          feedsEl.append(h3El);
          bodyEl.append(feedsEl);
        } else {
          h1El.innerHTML = feeds[i].title.innerHTML;
          pEl.innerHTML = feeds[i].description.innerHTML;

          boxEl.append(h1El);
          boxEl.append(pEl);
          contentEl.prepend(boxEl);
          bodyEl.prepend(contentEl);
        }
      }
    });
};

export default getFeed;
