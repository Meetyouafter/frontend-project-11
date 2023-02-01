import i18next from 'i18next';
import changeLanguage from './translate/translate';
import watchedState from './state';
import { feedsEl, contentEl } from './domModify';
import modalWindow from './modalWindow/modalButton';
import modalButton from './modalWindow/modalWindow';

const readPost = (el) => {
  for (const post of watchedState.uiState.posts) {
    if (post.title === el.text) {
      post.readed = true;
      el.classList.remove('fw-bold');
      el.classList.add('fw-normal');
    }
  }
};

const parser = (data) => {
  const Parser = new DOMParser();
  const parseData = Parser.parseFromString(data, 'application/xml');
  const notValidError = parseData.querySelector('parseerror');
  if (notValidError) {
    const inputEl = document.querySelector('#floatingInput');
    const divWithStatusEl = document.querySelector('.status');

    divWithStatusEl.innerText = i18next.t('rss_not_valid', { lng: watchedState.locale });
    changeLanguage(watchedState.locale, 'rss_not_valid');
    divWithStatusEl.classList.add('is-invalid');
    inputEl.classList.add('is-invalid');
    throw new Error('RSS is not valid');
  }
  console.log(parseData);
  return parseData;
};

const getFeedData = (content) => {
  const feedData = content.querySelector('channel');
  const feedTitleEl = feedData.querySelector('title').textContent;
  const feedDescriptionEl = feedData.querySelector('description').textContent;
  const feedLinkEl = feedData.querySelector('link').textContent;
  const feedItems = feedData.querySelectorAll('item');

  const itemsArray = Array.from(feedItems);

  const getPostsData = (items) => items.map((item) => {
    const title = item.querySelector('title').textContent;
    const description = item.querySelector('description').textContent;
    const link = item.querySelector('link').textContent;
    return { title, description, link };
  });
  const posts = getPostsData(itemsArray);
  watchedState.content.push({
    [feedLinkEl]: { title: feedTitleEl, description: feedDescriptionEl, posts },
  });
  return { title: feedTitleEl, description: feedDescriptionEl, posts };
};

const render = (post) => {
  const bodyEl = document.querySelector('.body');
  const h2El = document.createElement('h2');
  const h3El = document.createElement('h3');
  h2El.textContent = post.title;
  h3El.textContent = post.description;
  feedsEl.append(h2El);
  feedsEl.append(h3El);
  bodyEl.append(feedsEl);

  post.posts.map((feed, index) => {
    console.log(feed)
    console.log(feed.title)
    console.log(feed.description)
    console.log(feed.link)
    const boxEl = document.createElement('div');

    const linkEl = document.createElement('a');
    linkEl.setAttribute('target', '_blank');
    boxEl.classList.add('postBox');
    linkEl.classList.add('fw-bold');
    linkEl.textContent = feed.title;
    linkEl.href = feed.link;
    linkEl.addEventListener('click', () => readPost(linkEl));
    contentEl.append(boxEl);
    boxEl.append(linkEl);
    boxEl.append(modalButton(`postModal-${index}`));
    boxEl.append(modalWindow(`postModal-${index}`, feed.title, feed.description, feed.link));
    bodyEl.prepend(contentEl);
  });

};

const getContent = (url) => {
  const bodyEl = document.querySelector('.body');
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
    .then((data) => parser(data.contents))
    // .then((parseDocument) => console.log('daaaaaaaaaaaaaa', parseDocument))
    .then((content) => getFeedData(content))
    .then((newContent) => render(newContent))
    .catch((error) => console.error(error));
};

export { parser, getContent };
