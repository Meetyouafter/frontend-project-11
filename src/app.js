import i18n from 'i18next';
import watcher from './view/watcher.js';
import modalWindowAction from './actions/modalWindow.js';
import formAction from './actions/form.js';
import ru from './dictionary/ru.json';
import en from './dictionary/en.json';
import elements from './view/elements.js';
import trackingNewPosts from './actions/trackingNewPosts.js';

const changeLanguage = (value, state) => {
  state.language = value;
};

const app = () => {
  const i18nInstance = i18n.createInstance();
  i18nInstance.init({
    lng: 'ru',
    debug: false,
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
      openPostId: null,
      visitedPosts: [],
    },
  };

  const watchedState = watcher(state, elements, i18nInstance);

  elements.buttonEn.addEventListener('click', () => {
    changeLanguage('en', watchedState);
  });

  elements.buttonRu.addEventListener('click', () => {
    changeLanguage('ru', watchedState);
  });

  trackingNewPosts(watchedState);
  formAction(watchedState, i18nInstance);
  modalWindowAction(watchedState);
};

export default app;
