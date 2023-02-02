/* eslint-disable func-names */
/* eslint-disable no-console */
import onChange from 'on-change';

const state = {
  locale: 'ru',
  errors: [],
  feeds: [],
  content: [],
  posts: [],
  newPosts: [],
  uiState: {
    readedPost: [],
  },
  data: {},
};

const watchedState = onChange(state, function (path, value, previousValue) {
  console.log(this, path, previousValue, value);
  // console.log(this);
  // console.log(path);
  // console.log(previousValue);
  // console.log(value);
});

export default watchedState;
