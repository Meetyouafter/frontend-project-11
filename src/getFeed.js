/* eslint-disable no-console */
import modalButton from './modalWindow/modalButton';
import modalWindow from './modalWindow/modalWindow';
import { state } from './state';

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
      window.content = content;
      console.log(content);
      console.log(state);

      state.contents.push(content);
      const item = content.querySelectorAll('item');
      const feedTitles = content.querySelectorAll('title');
      const feedDescriptions = content.querySelectorAll('description');
      const feedLink = content.querySelectorAll('link');

      const itemsArray = Array.from(item);
      const titlesArray = Array.from(feedTitles);
      const descriptionsArray = Array.from(feedDescriptions);
      const linksArray = Array.from(feedLink);

      //   const divs = [...content.querySelectorAll('div')];
      const result = [];
      const textNodes = itemsArray.map((el) => {
        const nodes = [...el.childNodes]
          .filter((el) => el instanceof Text)
          .filter((el) => el.textContent.trim() !== '');
        //            textNodes.forEach(el => {
        //             const p = document.createElement('p')
        //             p.textContent = el.textContent;
        //             el.replaceWith(p)
        //           })
        result.push(nodes[0].data);
        console.log(typeof textNodes);
        console.log(nodes, 'nodes');
        console.log(nodes[0].data, 'nodes');
        el = 44;
        // return el
      });

      //   const text2 = textNodes.map(el => el[0].data)
      // console.log(text2)

      result.unshift('empty');
      console.log(textNodes, 'textNodes');
      console.log(result, 'result');

      //    const texts = feedLink.forEach(el => el.node === 'text')
      //  console.log(texts, 'texts')

      //    const textEl = linksArray.filter(el => el === 'text')
      //  console.log(linksArray, 'linksArray')
      //   console.log(textEl, 'textEl')

      for (let i = 0; i < titlesArray.length; i += 1) {
        feeds[i] = {
          title: titlesArray[i],
          description: descriptionsArray[i],
          link: result[i],
          index: i,
        };
      }
      console.log(feeds, 'feeds');

      for (let i = 0; i < feeds.length; i += 1) {
        const boxEl = document.createElement('div');
        const pEl = document.createElement('p');
        const h2El = document.createElement('h2');
        const h3El = document.createElement('h3');
        const linkEl = document.createElement('a');

        linkEl.setAttribute('target', '_blank');
        boxEl.classList.add('postBox');

        if (i === 0) {
          h2El.innerHTML = feeds[i].title.innerHTML;
          h3El.innerHTML = feeds[i].description.innerHTML;
          feedsEl.append(h2El);
          feedsEl.append(h3El);
          bodyEl.append(feedsEl);
        } else {
          //    pEl.innerHTML = feeds[i].description.innerHTML;
          linkEl.innerText = feeds[i].title.innerText;
          linkEl.href = feeds[i].link;

          //    boxEl.append(pEl);
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
