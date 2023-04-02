import i18n from 'i18next';
import observationAppState from './actions/observationAppState.js';
import getFeedData from './actions/getFeedData.js';
import ru from './dictionary/ru.json';
import en from './dictionary/en.json';
import elements from './view/elements.js';
import observationNewPosts from './actions/observationNewPosts.js';

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

  observationNewPosts(watchedState);
  getFeedData(watchedState, i18nInstance);
};

export default app;
