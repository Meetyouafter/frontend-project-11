import elements from '../view/elements.js';

const getOpenedPostData = (watchedState) => {
  const postContaner = elements.posts;
  const { closeBtn } = elements.modal;

  postContaner.addEventListener('click', (e) => {
    const { id } = e.target.dataset;
    const { visitedPosts } = watchedState.uiState;

    const openPost = watchedState.posts.find((post) => post.idItem === id);

    watchedState.uiState.openPostData = {
      id,
      title: openPost.title,
      description: openPost.description,
      link: openPost.link,
    };
    visitedPosts.push(id);
  });

  closeBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      watchedState.uiState.openPostData = null;
    });
  });
};

export default getOpenedPostData;
