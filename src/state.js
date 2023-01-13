/* eslint-disable func-names */
/* eslint-disable no-console */
import onChange from 'on-change';

const state = {
  feeds: [],
  locale: 'ru',
  contents: [],
  posts: [],
  uiState: {
    posts: [],
  },
};

const watchedState = onChange(state, function (path, value, previousValue) {
  console.log('watchedState', this, path, value, previousValue);
});

export default watchedState;
