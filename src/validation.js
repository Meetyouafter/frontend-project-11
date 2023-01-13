import * as yup from 'yup';

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

export default inputSchema;
