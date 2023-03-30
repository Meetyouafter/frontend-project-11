import onChange from 'on-change';
import formStatusView from '../view/formStatusView.js';
import modalWindowView from '../view/modalWindowView.js';
import postsRender from '../view/forms/posts/postsRender.js';
import feedsRender from '../view/forms/feeds/feedsRender.js';
import interfaceLanguageView from '../view/interfaceLanguageView.js';

const getFormError = (elements, i18Instance) => {
  const { feedback, submitButton } = elements;
  feedback.textContent = i18Instance.t('network');
  submitButton.disabled = false;
  feedback.classList.add('text-danger');
};

const renderingApp = (elements, i18Instance, state) => (path, value) => {
  switch (path) {
    case 'language':
      interfaceLanguageView(elements, state, i18Instance);
      break;
    case 'feeds':
      feedsRender(elements, state);
      break;
    case 'form.status':
      formStatusView(elements, value, state, i18Instance);
      break;
    case 'posts':
      postsRender(elements, state);
      break;
    case 'uiState.openPostData':
      modalWindowView(elements, state);
      break;
    case 'processError':
      getFormError(elements, i18Instance);
      break;
    default:
      break;
  }
};

const observationAppState = (state, el, lang) => onChange(state, renderingApp(el, lang, state));

export default observationAppState;
