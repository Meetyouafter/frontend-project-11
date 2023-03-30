import i18n from 'i18next';
import watcher from './view/watcher.js';
import getOpenedPostData from './actions/getOpenedPostData.js';
import getFeedData from './actions/getFeedData.js';
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
  getFeedData(watchedState, i18nInstance);
  getOpenedPostData(watchedState);
};

export default app;
