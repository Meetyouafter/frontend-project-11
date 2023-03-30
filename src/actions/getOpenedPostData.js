import elements from '../view/elements.js';

const getOpenedPostData = (watchedState) => {
  const postContaner = elements.posts;
  const { closeBtn } = elements.modal;

  postContaner.addEventListener('click', (e) => {
    const { id } = e.target.dataset;
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

export default getOpenedPostData;
