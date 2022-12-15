import * as yup from 'yup';
import i18next from "i18next";

const getLang = () => {
  return window.state.language;
}

const getLinks = () => {
  return window.state.link;
}



  yup.setLocale({
  mixed: {
    required: 'rss.input_required',
    notOneOf: 'rss.rss_was_load_message',
  },
  string: {
    url: 'rss.input_invalid',
  }
});

const inputSchema = yup.object().shape({
  link: yup
  .string()
  .required()
  .url()
});

const stateSchema = yup.mixed().notOneOf(getLinks());

export { inputSchema, stateSchema, getLang, getLinks };
