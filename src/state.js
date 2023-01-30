/* eslint-disable func-names */
/* eslint-disable no-console */
import onChange from 'on-change';
import save from 'on-change'

const state = {
  feeds: ['https://lorem-rss.hexlet.app/feed?unit=second&interval=5', 'https://lorem-rss.hexlet.app/feed?unit=second&interval=10'],
  locale: 'ru',
  contents: [],
  posts: [],
  links: [],
  uiState: {
    posts: [],
  },
};

const watchedState = onChange(state, function (path, value, previousValue) {
  console.log(this);
  console.log(path);
  console.log(previousValue);
  console.log(value);
});

export default watchedState;
