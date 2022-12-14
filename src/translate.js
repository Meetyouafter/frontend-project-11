import i18next from 'i18next';
import { watchedState } from './state';

i18next.init({
  lng: watchedState.locale,
  debug: true,
  resources: {
    en: {
      translation: {
        rss: {
          input_required: 'Enter the RSS',
          input_invalid: 'Enter the correct RSS',
          rss_was_load_message: 'The RSS already exist',
          rss_done: 'The RSS load was succesful',
        },
        interface: {
          title: 'RSS agregator',
          description: "Let's start to read the RSS now! It is easy end beautiful.",
          button: 'Add',
          input: 'RSS link',
          example: 'Example: https://ru.hexlet.io/lessons.rss',
        },
      },
    },
    ru: {
      translation: {
        rss: {
          input_required: 'Введите адрес RSS',
          input_invalid: 'Введите корректный адрес RSS',
          rss_was_load_message: 'RSS уже существует',
          rss_done: 'RSS успешно загружен',
        },
        interface: {
          title: 'RSS агрегатор',
          description: 'Начните читать RSS сегодня! Это легко, это красиво.',
          button: 'Добавить',
          input: 'Ссылка RSS',
          example: 'Пример: https://ru.hexlet.io/lessons.rss',
        },
      },
    },
  },
});

const changeLanguage = (language, err) => {
  const title = document.querySelector('.title');
  title.innerText = i18next.t('interface.title', { lng: language });

  const description = document.querySelector('.description');
  description.innerText = i18next.t('interface.description', { lng: language });

  const example = document.querySelector('.example');
  example.innerText = i18next.t('interface.example', { lng: language });

  const btn = document.querySelector('.btn-primary');
  btn.innerText = i18next.t('interface.button', { lng: language });

  const input = document.querySelector('label');
  input.innerText = i18next.t('interface.input', { lng: language });

  const status = document.querySelector('.status');
  const getStatus = () => {
    if (err === 'complete') {
      status.innerText = i18next.t('rss_done', { lng: language });
    } else {
      status.innerText = i18next.t(err, { lng: language });
    }
  };

  getStatus();
};

export default changeLanguage;
