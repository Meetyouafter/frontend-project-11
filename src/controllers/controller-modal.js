import { elements } from '../consts.js';

const controllerModal = (watchedState) => {
  const postContaner = elements.posts;
  const { closeBtn } = elements.modal;

  postContaner.addEventListener('click', (evt) => {
    const { id } = evt.target.dataset;
    const { visitedPosts } = watchedState.uiState;
    visitedPosts.push(id);
    watchedState.uiState.openPostId = id;
  });

  closeBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      watchedState.uiState.openPostId = null;
    });
  });
};

export default controllerModal;
