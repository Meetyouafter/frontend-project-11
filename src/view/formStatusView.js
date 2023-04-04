const formStatuses = {
  success: 'success',
  error: 'error',
  sending: 'sending',
  idle: 'idle',
};

const renderSuccess = (elements, i18Instance, language) => {
  const { feedback, input } = elements;
  input.classList.remove('is-invalid');
  feedback.textContent = '';
  feedback.classList.add('text-success');
  feedback.classList.remove('text-danger');
  feedback.textContent = i18Instance.t('form.success', { lng: language });
};

const renderErrors = (elements, state) => {
  if (state.processError === null) {
    const { feedback, input } = elements;
    feedback.textContent = '';
    input.classList.add('is-invalid');
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
    feedback.textContent = state.form.errors;
  }
};

const formStatusView = (elements, status, state, i18Instance) => {
  const { submitButton } = elements;
  switch (status) {
    case formStatuses.success:
      renderSuccess(elements, i18Instance, state.language);
      submitButton.disabled = false;
      state.form.errors = {};
      break;
    case formStatuses.error:
      renderErrors(elements, state);
      submitButton.disabled = false;
      break;
    case formStatuses.sending:
      submitButton.disabled = true;
      break;
    case formStatuses.idle:
      submitButton.disabled = false;
      break;
    default:
      throw new Error(`Unknown process state: ${status}`);
  }
};

export default formStatusView;
