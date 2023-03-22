const modalView = (elements, state) => {
  const {
    title, description, readBtn,
  } = elements.modal;
  const id = state.uiState.openPostId;
  const openPost = state.posts.find((post) => post.idItem === id);

  const handleOpen = (post) => {
    readBtn.href = post.link;
    title.textContent = post.title;
    description.textContent = post.description;
  };

  const currentLink = document.querySelector(`a[data-id="${id}"]`);
  currentLink.classList.remove('fw-bold');
  currentLink.classList.add('fw-normal', 'link-secondary');
  handleOpen(openPost);
};

export default modalView;
