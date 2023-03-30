import * as yup from 'yup';
import axios from 'axios';
import getParseDataWithId from './getParseDataWithId.js';
import validationSchema from './validation.js';
import { formStatusState } from '../view/formStatusView.js';
import elements from '../view/elements.js';

const BASE_URL = 'https://allorigins.hexlet.app';

const proxy = (url) => {
  const proxyUrl = new URL('/get', BASE_URL);
  proxyUrl.searchParams.append('disableCache', 'true');
  proxyUrl.searchParams.append('url', url);
  return proxyUrl;
};

const formAction = (watchedState, i18Instance) => {
  yup.setLocale({
    string: {
      required: i18Instance.t('form.required'),
      url: i18Instance.t('form.url'),
    },
  });

  elements.form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    watchedState.form.status = formStatusState.Sending;
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
            const data = getParseDataWithId(response.data.contents, linkName);
            const { feedData, postsData } = data;
            posts.unshift(...postsData);
            feeds.unshift(feedData);
            feedsLinks.push(link);
            watchedState.form.status = formStatusState.Success;
            watchedState.processError = null;
          })
          .catch((err) => {
            form.errors = err.isParsing ? i18Instance.t('form.badRSS') : i18Instance.t('network');
            watchedState.form.status = formStatusState.Error;
            throw err;
          });
      })
      .catch((err) => {
        form.valid = false;
        form.errors = err.message;
        watchedState.form.status = formStatusState.Error;
        watchedState.processError = null;
      });
  });
};

export default formAction;
export { proxy };
