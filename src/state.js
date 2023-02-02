/* eslint-disable func-names */
/* eslint-disable no-console */
import onChange from 'on-change';

const state = {
  locale: 'ru',
  feeds: [],
  content: [],
  posts: [],
  uiState: {
    posts: [],
  },
  data: {},
};

const watchedState = onChange(state, function (path, value, previousValue) {
  console.log(this);
  console.log(path);
  console.log(previousValue);
  console.log(value);
});

export default watchedState;
