import onChange from 'on-change';
import { modalWindowView, modalButtonView } from './modal.js';
import feedDataView from './feed.js';

const getInitstate = () => ({
  locale: 'ru',
  errors: [],
  feeds: [],
  content: [],
  posts: [],
  newPosts: [],
  uiState: {
    readedPost: [],
    modalWindow: '',
  },
  data: {},
});

const state2 = {
  locale: 'ru',
  feeds: [],
  content: [],
  newPosts: [],
  uiState: {
    readedPost: [],
    modalWindow: '',
  },
};

const state = getInitstate();

const watchedState = onChange(state, (path, value, previousValue) => {
  console.log(this, path, previousValue, value);
  const bodyEl = document.querySelector('.body');
  if (path === 'uiState.modalWindow') {
    const modalWindow = modalWindowView(watchedState.uiState.modalWindow);
    const modalButton = document.querySelector('.btn-outline-secondary');
    modalButton.addEventListener('click', async () => {
      await bodyEl.prepend(modalWindow);
    });
  }
});

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

const renderPost = (post) => {
  const bodyEl = document.querySelector('.body');
  const boxEl = document.createElement('div');
  const linkEl = document.createElement('a');
  linkEl.setAttribute('target', '_blank');
  boxEl.classList.add('postBox');
  linkEl.classList.add('fw-bold');
  linkEl.textContent = post.title;
  linkEl.href = post.link;
  linkEl.addEventListener('click', () => {
    watchedState.uiState.readedPost.push(linkEl.textContent);
    if (watchedState.uiState.readedPost.includes(linkEl.textContent)) {
      linkEl.classList.remove('fw-bold');
      linkEl.classList.add('fw-normal');
    }
  });
  contentEl.append(boxEl);
  boxEl.append(linkEl);
  const modalButton = modalButtonView();
  modalButton.addEventListener('click', async () => {
    watchedState.uiState.modalWindow = await [post.title, post.description, post.link];
    const modalWindow = () => modalWindowView(watchedState);
    await bodyEl.prepend(modalWindow());
    watchedState.uiState.readedPost.push(post.title);
    if (watchedState.uiState.readedPost.includes(post.title)) {
      linkEl.classList.remove('fw-bold');
      linkEl.classList.add('fw-normal');
    }
  });
  boxEl.append(modalButton);
  bodyEl.prepend(contentEl);
  return bodyEl;
};

const render = (watchState) => {
  feedDataView(feedsEl, watchState.content);
  watchState.posts.map((post) => renderPost(post));
};

const renderPostForObserver = (post) => {
  const bodyEl = document.querySelector('.body');
  const boxEl = document.createElement('div');
  const linkEl = document.createElement('a');
  linkEl.setAttribute('target', '_blank');
  boxEl.classList.add('postBox');
  linkEl.classList.add('fw-bold');
  linkEl.textContent = post.title;
  linkEl.href = post.link;
  linkEl.addEventListener('click', () => {
    watchedState.uiState.readedPost.push(linkEl.textContent);
    if (watchedState.uiState.readedPost.includes(linkEl.textContent)) {
      linkEl.classList.remove('fw-bold');
      linkEl.classList.add('fw-normal');
    }
  });
  contentEl.append(boxEl);
  boxEl.append(linkEl);
  const modalButton = modalButtonView();
  boxEl.append(modalButton);
  bodyEl.prepend(contentEl);
  return bodyEl;
};

const observerRender = (obsState) => {
  if (obsState.newPosts.length === 0) return;
  obsState.newPosts.map((post) => renderPostForObserver(post));
};

export default render;
export { observerRender };
export { watchedState };
