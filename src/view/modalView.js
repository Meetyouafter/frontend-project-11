const modalView = (elements, state) => {
  const { body } = elements;
  const {
    modalContainer, title, description, readBtn,
  } = elements.modal;
  const id = state.uiState.openPostId;
  const openPost = state.posts.find((post) => post.idItem === id);

  const handleOpenClick = (post) => {
    // body.classList.add('modal-open');
    // modalContainer.classList.add('show');
    // modalContainer.style.display = 'block';
    readBtn.href = post.link;
    title.textContent = post.title;
    description.textContent = post.description;
  };

  const currentLink = document.querySelector(`a[data-id="${id}"]`);
  currentLink.classList.remove('fw-bold');
  currentLink.classList.add('fw-normal', 'link-secondary');
  handleOpenClick(openPost);
};

export default modalView;
