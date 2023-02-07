import { v4 as uuidv4 } from 'uuid';
import onChange from 'on-change';

const renderModalWindow = (uiState) => {
  const modalData = uiState.uiState.modalWindow;
  const [title, description, link] = modalData;
  const modal = document.querySelector('#modal');
  const modalTitle = modal.querySelector('.modal-title');
  modalTitle.textContent = title;
  const modalBody = modal.querySelector('.modal-body');
  modalBody.textContent = description;
  const readButton = modal.querySelector('[target="_blank"]');
  readButton.setAttribute('href', link);
  return modal;
};

const state = {
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
};

const watchedState = onChange(state, function (path, value, previousValue) {
  console.log(this, path, previousValue, value);
  if (path === 'uiState.modalWindow') {
  const bodyEl = document.querySelector('.body');
    const modalWindow = renderModalWindow(watchedState);
    const modalButton = document.querySelector('.btn-outline-secondary')
    modalButton.addEventListener('click', async () => {
      await bodyEl.prepend(modalWindow);
    });

  }
  // console.log(path);
  // console.log(previousValue);
  // console.log(value);
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

const renderModalButton = () => {
  const postButton = document.createElement('button');
  postButton.classList.add('btn', 'btn-outline-secondary');
  postButton.setAttribute('data-bs-toggle', 'modal');
  postButton.setAttribute('data-bs-target', '#modal');
  postButton.innerText = 'Просмотр';
  return postButton;
};

const renderFeedData = (contents) => contents.map((content) => {
  const bodyEl = document.querySelector('.body');
  const h2El = document.createElement('h2');
  const h3El = document.createElement('h3');
  h2El.textContent = content.title;
  h3El.textContent = content.description;
  feedsEl.append(h2El);
  feedsEl.append(h3El);
  bodyEl.append(feedsEl);
  return bodyEl;
});

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
  const modalButton = renderModalButton();
  modalButton.addEventListener('click', async () => {
     watchedState.uiState.modalWindow = await [post.title, post.description, post.link];
     const modalWindow = () => renderModalWindow(watchedState)
    await bodyEl.prepend(modalWindow());
  });
  boxEl.append(modalButton);
  bodyEl.prepend(contentEl);
  return bodyEl;
};

const render = (state) => {
  renderFeedData(state.content);
  state.posts.map((post) => renderPost(post));
};

const renderPostForObserver = (post) => {
  const index = uuidv4();
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
  boxEl.append(renderModalButton(`postModal-${index}`));
  bodyEl.prepend(contentEl);
  return bodyEl;
};

const observerRender = (state) => {
  if (state.newPosts.length === 0) return;
  state.newPosts.map((post) => renderPostForObserver(post));
  state.posts.concat(state.newPosts);
  state.newPosts = [];
};

export default render;
export { observerRender };
export { watchedState };
