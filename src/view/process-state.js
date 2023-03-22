import { ProcessState } from '../consts.js';

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

const handleProcessState = (elements, processState, state, i18Instance) => {
  const { submitButton } = elements;
  switch (processState) {
    case ProcessState.Success:
      renderSuccess(elements, i18Instance);
      submitButton.disabled = false;
      state.form.errors = {};
      break;

    case ProcessState.Error:
      renderErrors(elements, state);
      submitButton.disabled = false;
      break;

    case ProcessState.Sending:
      submitButton.disabled = true;
      break;

    case ProcessState.Idle:
      submitButton.disabled = false;
      break;

    default:
      throw new Error(`Unknown process state: ${processState}`);
  }
};

export default handleProcessState;
