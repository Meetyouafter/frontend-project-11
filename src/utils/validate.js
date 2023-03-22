import * as yup from 'yup';
import { getFeedsLinks } from './api.js';

const validate = (state, i18Instance) => {
  const feedsLinks = getFeedsLinks(state);
  const schema = yup.object({
    url: yup.string()
      .required()
      .url()
      .notOneOf(feedsLinks, i18Instance.t('form.rssExist')),
  });

  const validateSchema = (link) => schema
    .validate({ url: link }, { abortEarly: false })
    .then(({ url }) => {
      state.form.errors = {};

      return Promise.resolve(url.trim());
    })
    .catch((err) => {
      throw err;
    });

  return validateSchema;
};

export default validate;
