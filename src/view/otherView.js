const interfaceLanguageView = (elements, watchedState, i18next) => {
  const keys = Object.keys(elements.translate);
  const values = Object.values(elements.translate);

  for (let i = 0; i < keys.length; i += 1) {
    values[i].innerText = i18next.t(`interface.${keys[i]}`, { lng: watchedState.language });
  }
};

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

export { interfaceLanguageView, modalWindowView };
