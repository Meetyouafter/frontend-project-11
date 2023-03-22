import * as yup from 'yup';
import axios from 'axios';
import getParsedRSS from '../parser.js';
import validateUrl from '../validate.js';
import { getFeedsLinks, proxyUrl } from '../utils.js';
import { elements, ProcessState } from '../consts.js';

const controllerForm = (watchedState, i18Instance) => {
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
    const validate = validateUrl(watchedState, i18Instance);
    const feedsLinks = getFeedsLinks(watchedState);

    validate(linkName)
      .then((url) => {
        axios({
          url: proxyUrl(url),
        })
          .then((response) => {
            const data = getParsedRSS(response.data.contents, watchedState, linkName);
            const { feedData, postsData } = data;
            posts.unshift(...postsData);
            feeds.unshift(feedData);
            feedsLinks.push(url.trim());
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

export default controllerForm;
