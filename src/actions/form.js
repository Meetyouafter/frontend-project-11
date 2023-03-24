import * as yup from 'yup';
import axios from 'axios';
import getParseDataWithId from '../utils/parser.js';
import validationSchema from '../utils/validate.js';
import { getFeedsLinks, formStatusState } from '../utils/utils.js';
import proxy from '../utils/api.js';
import elements from '../utils/elements.js';

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
    const validation = validationSchema(getFeedsLinks(watchedState), i18Instance);
    const feedsLinks = getFeedsLinks(watchedState);

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
