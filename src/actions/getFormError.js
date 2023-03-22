const getFormError = (elements, i18Instance) => {
  const { feedback, submitButton } = elements;
  feedback.textContent = i18Instance.t('network');
  submitButton.disabled = false;
  feedback.classList.add('text-danger');
};

export default getFormError;
