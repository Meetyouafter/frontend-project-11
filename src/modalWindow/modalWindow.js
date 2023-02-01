const modalWindow = (modalId, modalTitle, modalDescription, modalLink) => {
  console.log(modalId);
  console.log(modalTitle);
  console.log(modalDescription);
  console.log(modalLink);
  const modalWrap = document.createElement('div');
  modalWrap.classList.add('modal', 'fade');
  modalWrap.setAttribute('id', `${modalId}`);
  modalWrap.setAttribute('tabindex', -1);
  modalWrap.setAttribute('aria-labelledby', `${modalId}Label`);
  modalWrap.setAttribute('aria-hidden', true);
  modalWrap.setAttribute('data-mdb-backdrop', true);
  modalWrap.innerHTML = `
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id=${modalId}Label>${modalTitle}</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <p>${modalDescription}</p>
      </div>
      <div class="modal-footer">
        <a href="${modalLink}" class="btn btn-primary" role="button" aria-disabled="false" target="_blank">Читать полностью</a>
        <button
          type="button"
          class="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Закрыть
        </button>
      </div>
    </div>
  </div>
  `;
  return modalWrap;
};

export default modalWindow;
