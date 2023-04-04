const interfaceLanguageView = (elements, watchedState, i18next) => {
  const keys = Object.keys(elements.translate);
  const values = Object.values(elements.translate);

  for (let i = 0; i < keys.length; i += 1) {
    values[i].innerText = i18next.t(`interface.${keys[i]}`, { lng: watchedState.language });
  }
};

const modalWindowView = (elements, state) => {
  const { visitedPosts } = state.uiState;

  if (!visitedPosts) {
    return;
  }

  const openPost = state.posts
    .find((post) => post.idItem === visitedPosts[visitedPosts.length - 1]);

  const {
    title, description, readBtn,
  } = elements.modal;

  readBtn.href = openPost.link;
  title.textContent = openPost.title;
  description.textContent = openPost.description;

  const currentLink = document.querySelector(`a[data-id="${openPost.idItem}"]`);
  currentLink.classList.remove('fw-bold');
  currentLink.classList.add('fw-normal', 'link-secondary');
};

export { interfaceLanguageView, modalWindowView };
