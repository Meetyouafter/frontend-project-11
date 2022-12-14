import * as yup from 'yup';
import state from './state';

yup.setLocale({
  mixed: {
    required: 'Введите адрес RSS',
    notOneOf: 'RSS уже существует',
  },
  string: {
    url: 'Введите корректный адрес RSS',
  }
});

const inputSchema = yup.object().shape({
  link: yup
  .string()
  .required()
  .url()
});

const stateSchema = yup.mixed().notOneOf(state.link);

export { inputSchema, stateSchema };
