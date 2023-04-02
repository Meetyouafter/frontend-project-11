import * as yup from 'yup';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import getParseData from './getParseData.js';
import elements from '../view/elements.js';

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

const validationSchema = (feedsLinks, i18Instance) => {
  const schema = yup.object({
    url: yup.string()
      .required()
      .url()
      .notOneOf(feedsLinks, i18Instance.t('form.rssExist')),
  });

  const validation = (state, link) => schema
    .validate({ url: link }, { abortEarly: false })
    .then(({ url }) => {
      state.form.errors = {};

      return Promise.resolve(url);
    })
    .catch((err) => {
      throw err;
    });

  return validation;
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

const getFeedData = (watchedState, i18Instance) => {
  yup.setLocale({
    string: {
      required: i18Instance.t('form.required'),
      url: i18Instance.t('form.url'),
    },
  });

  const postContaner = elements.posts;
  const { closeBtn } = elements.modal;

  elements.form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    watchedState.form.status = formStatuses.sending;
    watchedState.processError = null;

    const formData = new FormData(evt.target);
    const linkName = formData.get(elements.input.name).trim();
    const { form, feeds, posts } = watchedState;
    const feedsLinks = watchedState.feeds.map((feed) => feed.linkName);
    const validation = validationSchema(feedsLinks, i18Instance);

    validation(watchedState, linkName)
      .then((link) => {
        axios({
          url: proxy(link),
        })
          .then((response) => {
            const data = addIdToFeedData(response.data.contents, linkName);
            const { feedData, postsData } = data;
            posts.unshift(...postsData);
            feeds.unshift(feedData);
            feedsLinks.push(link);
            watchedState.form.status = formStatuses.success;
            watchedState.processError = null;
          })
          .catch((err) => {
            form.errors = err.isParsing ? i18Instance.t('form.badRSS') : i18Instance.t('network');
            watchedState.form.status = formStatuses.error;
            throw err;
          });
      })
      .catch((err) => {
        form.valid = false;
        form.errors = err.message;
        watchedState.form.status = formStatuses.error;
        watchedState.processError = null;
      });
  });

  postContaner.addEventListener('click', (e) => {
    const { id } = e.target.dataset;
    const { visitedPosts } = watchedState.uiState;

    const openPost = watchedState.posts.find((post) => post.idItem === id);

    watchedState.uiState.openPostData = {
      id,
      title: openPost.title,
      description: openPost.description,
      link: openPost.link,
    };
    visitedPosts.push(id);
  });

  closeBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      watchedState.uiState.openPostData = null;
    });
  });
};

export default getFeedData;
export { proxy, formStatuses, addIdToFeedData };
