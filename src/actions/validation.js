import * as yup from 'yup';

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

export default validationSchema;
