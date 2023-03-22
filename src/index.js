import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import i18n from 'i18next';
import watch from './view/watchers.js';
import controllerForm from './controllers/controller-form.js';
import controllerModal from './controllers/controller-modal.js';
import ru from './locales/dictionary/ru.json';
import en from './locales/dictionary/en.json';
import updatePosts from './update-posts.js';
import { elements } from './consts.js';
import controllerButtons from './controllers/controller-buttons.js';

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

  const watchedState = watch(state, elements, i18nInstance);

  updatePosts(watchedState);
  controllerButtons(watchedState);
  controllerForm(watchedState, i18nInstance);
  controllerModal(watchedState);
};

app();
