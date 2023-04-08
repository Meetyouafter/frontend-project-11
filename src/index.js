import * as yup from 'yup';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import onChange from 'on-change';
import i18n from 'i18next';
import getParseData from './actions/getParseData.js';
import getNewPosts from './actions/getNewPosts.js';
import formStatusView from './view/formStatusView.js';
import feedDataView from './view/feedDataView.js';
import { interfaceLanguageView, modalWindowView } from './view/otherView.js';
import ru from './dictionary/ru.json';
import en from './dictionary/en.json';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const formStatuses = {
  success: 'success',
  error: 'error',
  sending: 'sending',
  idle: 'idle',
};

const BASE_URL = 'https://allorigins.hexlet.app';

const proxy = (url) => {
  const proxyUrl = new URL('/get', BASE_URL);
  proxyUrl.searchParams.append('disableCache', 'true');
  proxyUrl.searchParams.append('url', url);
  return proxyUrl;
};

const addIdToFeedData = (content, linkName) => {
  const { feedData, postsData } = getParseData(content, linkName);
  const feedId = uuidv4();

  const feedDataWithId = {
    ...feedData,
    feedId,
  };

  const postDataWithId = postsData.map((el) => {
    el.feedId = feedId;
    el.idItem = uuidv4();
    return el;
  });

  return { feedData: feedDataWithId, postsData: postDataWithId };
};

const validationSchema = (feedsLinks) => {
  const schema = yup.object({
    url: yup.string()
      .url('url')
      .notOneOf(feedsLinks, 'rssExist'),
  });

  const validation = (initState, link) => schema
    .validate({ url: link }, { abortEarly: false })
    .catch((err) => {
      throw err;
    });

  return validation;
};

const renderingApp = (nodes, i18Instance, state) => (path, value) => {
  switch (path) {
    case 'language':
      interfaceLanguageView(nodes, state, i18Instance);
      break;
    case 'feeds':
    case 'posts':
      feedDataView(nodes, state, i18Instance);
      break;
    case 'form.status':
      formStatusView(nodes, value, state, i18Instance);
      break;
    case 'uiState.visitedPosts':
      modalWindowView(nodes, state);
      break;
    case 'processError':
      state.form.errors = 'network';
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
  const elements = {
    body: document.querySelector('body'),
    form: document.querySelector('.rss-form'),
    input: document.querySelector('.form-control'),
    submitButton: document.querySelector('[type="submit"]'),
    languages: document.querySelector('.language_container'),
    feeds: document.querySelector('.feeds'),
    posts: document.querySelector('.posts'),
    feedback: document.querySelector('.feedback'),
    modal: {
      title: document.querySelector('.modal-title'),
      description: document.querySelector('.modal-body'),
      readBtn: document.querySelector('.full-article'),
    },
    translate: {
      description: document.querySelector('.description'),
      title: document.querySelector('.title'),
      label: document.querySelector('.label'),
      button: document.querySelector('.button'),
      example: document.querySelector('.example'),
      language: document.querySelector('.language'),
    },
  };

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
      visitedPosts: [],
    },
  };

  const watchedState = observationAppState(state, elements, i18nInstance);

  elements.languages.addEventListener('click', (e) => {
    const language = e.target.dataset.lng;

    switch (language) {
      case 'en':
        changeLanguage('en', watchedState);
        break;
      case 'ru':
        changeLanguage('ru', watchedState);
        break;
      default:
        break;
    }
  });

  const postContaner = elements.posts;

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    watchedState.form.status = formStatuses.sending;
    const formData = new FormData(e.target);
    const linkName = formData.get(elements.input.name).trim();
    const { feeds, posts } = watchedState;
    const feedsLinks = watchedState.feeds.map((feed) => feed.linkName);
    const validation = validationSchema(feedsLinks);

    validation(watchedState, linkName)
      .then(({ url }) => Promise.resolve(url))
      .then((link) => {
        axios({
          url: proxy(link),
        })
          .then((response) => {
            const data = addIdToFeedData(response.data.contents, linkName);
            const { feedData, postsData } = data;
            posts.unshift(...postsData);
            feeds.unshift(feedData);
            watchedState.form.status = formStatuses.success;
            watchedState.form.errors = false;
            watchedState.processError = null;
            watchedState.form.valid = true;
          })
          .catch((err) => {
            watchedState.form.errors = err.isParsing ? 'badRSS' : 'network';
            watchedState.form.status = formStatuses.error;
            throw err;
          });
      })
      .catch((err) => {
        watchedState.form.valid = false;
        watchedState.form.errors = err;
        watchedState.form.status = formStatuses.error;
        watchedState.processError = null;
      });
  });

  postContaner.addEventListener('click', (e) => {
    const { id } = e.target.dataset;
    const { visitedPosts } = watchedState.uiState;
    visitedPosts.push(id);
  });

  getNewPosts(watchedState);
};

app();
