import i18n from 'i18next';
import watcher from './view/watcher.js';
import modalWindowAction from './actions/modalWindow.js';
import formAction from './actions/form.js';
import ru from './locale/dictionary/ru.json';
import en from './locale/dictionary/en.json';
import elements from './utils/elements.js';
import observer from './utils/observer.js';
import localeButtonsAction from './actions/localeButtons.js';

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
      processState: 'idle',
      errors: '',
    },
    linkUrl: [],
    feeds: [],
    posts: [],
    uiState: {
      openPostId: null,
      visitedPosts: [],
    },
  };

  const watchedState = watcher(state, elements, i18nInstance);

  observer(watchedState);
  localeButtonsAction(watchedState);
  formAction(watchedState, i18nInstance);
  modalWindowAction(watchedState);
};

export default app;
