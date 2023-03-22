import createPostsHtml from './posts_html.js';

const postsRender = (elements, state) => {
  const { posts } = elements;

  if (state.uiState.visitedPosts.length > 0) {
    posts.innerHTML = createPostsHtml(state.posts);
    state.uiState.visitedPosts.forEach((id) => {
      const currentLink = document.querySelector(`a[data-id="${id}"]`);
      currentLink.classList.remove('fw-bold');
      currentLink.classList.add('fw-normal', 'link-secondary');
    });
  } else {
    posts.innerHTML = createPostsHtml(state.posts);
  }
};

export default postsRender;
