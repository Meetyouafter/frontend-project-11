import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import onChange from 'on-change';
import i18n from 'i18next';
import getFeedData from './actions/getFeedData.js';
import ru from './dictionary/ru.json';
import en from './dictionary/en.json';
import elements from './view/elements.js';
import getNewPosts from './actions/getNewPosts.js';
import formStatusView from './view/formStatusView.js';
import feedDataView from './view/feedDataView.js';
import { interfaceLanguageView, modalWindowView } from './view/otherView.js';

const getFormError = (nodes, i18Instance) => {
  const { feedback, submitButton } = nodes;
  feedback.textContent = i18Instance.t('network');
  submitButton.disabled = false;
  feedback.classList.add('text-danger');
};

const renderingApp = (nodes, i18Instance, state) => (path, value) => {
  switch (path) {
    case 'language':
      interfaceLanguageView(nodes, state, i18Instance);
      if (state.feeds.length) {
        feedDataView(nodes, state, i18Instance);
      }
      break;
    case 'feeds':
    case 'posts':
      feedDataView(nodes, state, i18Instance);
      break;
    case 'form.status':
      formStatusView(nodes, value, state, i18Instance);
      break;
    case 'uiState.openPostData':
      modalWindowView(nodes, state);
      break;
    case 'processError':
      getFormError(nodes, i18Instance);
      break;
    default:
      break;
  }
};

const observationAppState = (state, el, lang) => onChange(state, renderingApp(el, lang, state));

const changeLanguage = (value, state) => {
  state.language = value;
};

const app = () => {
  const i18nInstance = i18n.createInstance();
  i18nInstance.init({
    lng: 'ru',
    debug: true,
    resources: {
      en,
      ru,
    },
  });

  const state = {
    processError: null,
    language: 'ru',
    form: {
      valid: false,
      status: 'idle',
      errors: '',
    },
    feeds: [],
    posts: [],
    uiState: {
      openPostData: null,
      visitedPosts: [],
    },
  };

  const watchedState = observationAppState(state, elements, i18nInstance);

  elements.buttonEn.addEventListener('click', () => {
    changeLanguage('en', watchedState);
  });

  elements.buttonRu.addEventListener('click', () => {
    changeLanguage('ru', watchedState);
  });

  getNewPosts(watchedState);
  getFeedData(watchedState, i18nInstance);
};

app();
