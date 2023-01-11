const modalButton = (modalId) => {
  const postButton = document.createElement('button');
  postButton.classList.add('btn', 'btn-outline-secondary');
  postButton.setAttribute('data-bs-toggle', 'modal');
  postButton.setAttribute('data-bs-target', `#${modalId}`);
  postButton.innerText = 'Просмотр';
  return postButton;
};

export default modalButton;
