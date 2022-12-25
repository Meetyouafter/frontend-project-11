/* eslint-disable func-names */
/* eslint-disable no-console */
import onChange from 'on-change';

const state = {
  feeds: [],
  locale: 'ru',
  contents: [],
};

const watchedState = onChange(state, function (path, value, previousValue) {
  console.log('this:', this);
  console.log('path:', path);
  console.log('value:', value);
  console.log('previousValue:', previousValue);
});

export { state, watchedState };
