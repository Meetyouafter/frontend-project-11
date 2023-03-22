const modalWindowView = (data) => {
  console.log(data)
  const [title, description, link] = data;
  const modal = document.querySelector('#modal');
  const modalTitle = modal.querySelector('.modal-title');
  modalTitle.textContent = title;
  const modalBody = modal.querySelector('.modal-body');
  modalBody.textContent = description;
  const readButton = modal.querySelector('[target="_blank"]');
  readButton.setAttribute('href', link);
  return modal;
};

const modalButtonView = () => {
  const postButton = document.createElement('button');
  postButton.classList.add('btn', 'btn-outline-secondary');
  postButton.setAttribute('data-bs-toggle', 'modal');
  postButton.setAttribute('data-bs-target', '#modal');
  postButton.innerText = 'Просмотр';
  return postButton;
};

export { modalWindowView, modalButtonView };
