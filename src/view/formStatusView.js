const formStatuses = {
  success: 'success',
  error: 'error',
  sending: 'sending',
  idle: 'idle',
};

const renderSuccess = (elements, i18Instance, state) => {
  const { feedback, input } = elements;
  input.classList.remove('is-invalid');
  feedback.textContent = '';
  feedback.classList.add('text-success');
  feedback.classList.remove('text-danger');
  state.form.errors = 'success';
  feedback.textContent = i18Instance.t(`form.${state.form.errors}`, { lng: state.language });
};

const renderErrors = (elements, i18Instance, state) => {
  if (state.processError === null) {
    const { feedback, input } = elements;
    feedback.textContent = '';
    input.classList.add('is-invalid');
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
    if (String(state.form.errors) === 'ValidationError: url') {
      feedback.textContent = i18Instance.t('form.url', { lng: state.language });
    } if (String(state.form.errors) === 'ValidationError: rssExist') {
      feedback.textContent = i18Instance.t('form.url', { lng: state.language });
    } else {
      feedback.textContent = i18Instance.t(`form.${state.form.errors}`, { lng: state.language });
    }
  }
};

const formStatusView = (elements, status, state, i18Instance) => {
  const { submitButton } = elements;
  switch (status) {
    case formStatuses.success:
      renderSuccess(elements, i18Instance, state);
      submitButton.disabled = false;
      break;
    case formStatuses.error:
      renderErrors(elements, i18Instance, state);
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
