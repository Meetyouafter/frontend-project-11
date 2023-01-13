/* eslint-disable no-console */
import modalButton from './modalWindow/modalButton';
import modalWindow from './modalWindow/modalWindow';
import watchedState from './state';

const Parser = new DOMParser();

const bodyEl = document.querySelector('.body');
const feeds = [];

const contentEl = document.createElement('div');
contentEl.classList.add('col-8', 'content');
const contentPrimaryTitleEL = document.createElement('p');
contentPrimaryTitleEL.classList.add('primary_title');
contentPrimaryTitleEL.innerText = 'Посты';
contentEl.append(contentPrimaryTitleEL);

const feedsEl = document.createElement('div');
feedsEl.classList.add('col-4', 'feeds');
const feedsPrimaryTitleEL = document.createElement('p');
feedsPrimaryTitleEL.classList.add('primary_title');
feedsPrimaryTitleEL.innerText = 'Фиды';
feedsEl.append(feedsPrimaryTitleEL);

const getFeed = (url) => {
  fetch(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
    .then((response) => {
      if (response.ok) {
        watchedState.feeds.push(url);
        return response.json();
      }
      const h1El = document.createElement('h1');
      h1El.innerText = 'Что-то пошло не так';
      bodyEl.prepend(h1El);
      throw new Error('Network response was not ok.');
    })
    .then((data) => Parser.parseFromString(data.contents, 'text/html'))
    .then((content) => {
      console.log('content', content);
      console.log('state', watchedState);

      watchedState.contents.push(content);
      const item = content.querySelectorAll('item');
      const feedTitles = content.querySelectorAll('title');
      const feedDescriptions = content.querySelectorAll('description');

      const itemsArray = Array.from(item);
      const titlesArray = Array.from(feedTitles);
      const descriptionsArray = Array.from(feedDescriptions);

      const links = [];
      itemsArray.map((el) => {
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
          linkEl.innerText = feeds[i].title.innerText;
          linkEl.href = feeds[i].link;

          watchedState.posts.push(feeds[i].title.innerText);
          watchedState.uiState.posts.push({ title: feeds[i].title.innerText, readed: false });

          const readPost = (el) => {
            for (const post of watchedState.uiState.posts) {
              if (post.title === el.text) {
                post.readed = true;
                el.classList.remove('fw-bold');
                el.classList.add('fw-normal');
              }
            }
            console.log('state', watchedState);
          };

          linkEl.addEventListener('click', () => readPost(linkEl));

          contentEl.append(boxEl);
          boxEl.append(linkEl);
          boxEl.append(modalButton(`postModal${i}`));
          boxEl.append(modalWindow(`postModal${i}`, feeds[i].title.innerHTML, feeds[i].description.innerHTML, feeds[i].link));
          bodyEl.prepend(contentEl);
        }
      }
    });
};

export default getFeed;
