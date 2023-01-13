/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */

const readPost = (el) => {
  for (const post of watchedState.uiState.posts) {
    if (post.title === el.text) {
      post.readed = true;
      el.classList.remove('fw-bold');
      el.classList.add('fw-normal');
    }
  }
};

export { readPost };
