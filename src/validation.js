import * as yup from 'yup';
import { watchedState } from './state';

yup.setLocale({
  mixed: {
    required: 'rss.input_required',
    notOneOf: 'rss.rss_was_load_message',
  },
  string: {
    url: 'rss.input_invalid',
  },
});

const inputSchema = yup.object().shape({
  feeds: yup
    .string()
    .required()
    .url(),
});

// const feedsSchema = yup.mixed().notOneOf(watchedState.feeds);

// const feedsSchema = async () => await yup.string().notOneOf(watchedState.feeds).validate(data.feeds);

export { inputSchema };
