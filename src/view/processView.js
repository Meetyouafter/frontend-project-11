import { formStatusState } from '../utils/utils.js';

const renderSuccess = (elements, i18Instance) => {
  const { feedback, input } = elements;
  input.classList.remove('is-invalid');
  feedback.textContent = '';
  feedback.classList.add('text-success');
  feedback.classList.remove('text-danger');
  feedback.textContent = i18Instance.t('form.success');
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

const processView = (elements, status, state, i18Instance) => {
  const { submitButton } = elements;
  switch (status) {
    case formStatusState.Success:
      renderSuccess(elements, i18Instance);
      submitButton.disabled = false;
      state.form.errors = {};
      break;

    case formStatusState.Error:
      renderErrors(elements, state);
      submitButton.disabled = false;
      break;

    case formStatusState.Sending:
      submitButton.disabled = true;
      break;

    case formStatusState.Idle:
      submitButton.disabled = false;
      break;

    default:
      throw new Error(`Unknown process state: ${status}`);
  }
};

export default processView;
