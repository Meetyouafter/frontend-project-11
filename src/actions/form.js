import * as yup from 'yup';
import axios from 'axios';
import parser from '../utils/parser.js';
import validate from '../utils/validate.js';
import { getFeedsLinks, proxy } from '../utils/api.js';
import elements from '../utils/elements.js';
import ProcessState from '../utils/process.js';

const formAction = (watchedState, i18Instance) => {
  yup.setLocale({
    string: {
      required: i18Instance.t('form.required'),
      url: i18Instance.t('form.url'),
    },
  });

  elements.form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    watchedState.form.processState = ProcessState.Sending;
    watchedState.processError = null;

    const formData = new FormData(evt.target);
    const linkName = formData.get(elements.input.name).trim();
    const { form, feeds, posts } = watchedState;
    const validation = validate(watchedState, i18Instance);
    const feedsLinks = getFeedsLinks(watchedState);

    validation(linkName)
      .then((link) => {
        axios({
          url: proxy(link),
        })
          .then((response) => {
            const data = parser(response.data.contents, watchedState, linkName);
            const { feedData, postsData } = data;
            posts.unshift(...postsData);
            feeds.unshift(feedData);
            feedsLinks.push(link);
            watchedState.form.processState = ProcessState.Success;
            watchedState.processError = null;
          })
          .catch((err) => {
            form.errors = err.isParsing ? i18Instance.t('form.badRSS') : i18Instance.t('network');
            watchedState.form.processState = ProcessState.Error;
            throw err;
          });
      })
      .catch((err) => {
        form.valid = false;
        form.errors = err.message;
        watchedState.form.processState = ProcessState.Error;
        watchedState.processError = null;
      });
  });
};

export default formAction;
