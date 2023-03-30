const modalWindowView = (elements, state) => {
  const {
    title, description, readBtn,
  } = elements.modal;
  const postData = state.uiState.openPostData;

  readBtn.href = postData.link;
  title.textContent = postData.title;
  description.textContent = postData.description;

  const currentLink = document.querySelector(`a[data-id="${postData.id}"]`);
  currentLink.classList.remove('fw-bold');
  currentLink.classList.add('fw-normal', 'link-secondary');
};

export default modalWindowView;
