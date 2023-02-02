import { v4 as uuidv4 } from 'uuid';
import watchedState from './state';

const getPostsData = async (content) => {
  const id = uuidv4();
  const feedData = await content.querySelector('channel');
  const feedItems = await feedData.querySelectorAll('item');
  const itemsArray = await Array.from(feedItems);

  return itemsArray.map((item) => {
    const title = item.querySelector('title').textContent;
    const description = item.querySelector('description').textContent;
    const link = item.querySelector('link').textContent;
    return {
      title, description, link, id,
    };
  });
};

const observerParser = (data) => {
  const Parser = new DOMParser();
  const parseData = Parser.parseFromString(data, 'application/xml');
  const posts = getPostsData(parseData);
  return posts;
};

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

const renderModalButton = (modalId) => {
  const postButton = document.createElement('button');
  postButton.classList.add('btn', 'btn-outline-secondary');
  postButton.setAttribute('data-bs-toggle', 'modal');
  postButton.setAttribute('data-bs-target', `#${modalId}`);
  postButton.innerText = 'Просмотр';
  return postButton;
};

const renderModalWindow = (modalId, modalTitle, modalDescription, modalLink) => {
  const modalWrap = document.createElement('div');
  modalWrap.classList.add('modal', 'fade');
  modalWrap.setAttribute('id', `${modalId}`);
  modalWrap.setAttribute('tabindex', -1);
  modalWrap.setAttribute('aria-labelledby', `${modalId}Label`);
  modalWrap.setAttribute('aria-hidden', true);
  modalWrap.setAttribute('data-mdb-backdrop', true);
  modalWrap.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id=${modalId}Label>${modalTitle}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>${modalDescription}</p>
        </div>
        <div class="modal-footer">
          <a href="${modalLink}" class="btn btn-primary" role="button" aria-disabled="false" target="_blank">Читать полностью</a>
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
    `;
  return modalWrap;
};

const renderPost = (post) => {
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
  boxEl.append(renderModalWindow(`postModal-${index}`, post.title, post.description, post.link));
  bodyEl.prepend(contentEl);
  return bodyEl;
};

const observerRender = (state) => {
  if (state.newPosts.length === 0) return;
  state.newPosts.map((post) => renderPost(post));
  state.posts.concat(state.newPosts);
  state.newPosts = [];
};

export default observerParser;
export { observerRender };
