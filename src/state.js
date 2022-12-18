import onChange from 'on-change';

const state = {
  feeds: [],
  locale: 'ru',
};

const watchedState = onChange(state, function (path, value, previousValue) {
	console.log('this:', this);
	console.log('path:', path);
	console.log('value:', value);
	console.log('previousValue:', previousValue);
});

export default watchedState;