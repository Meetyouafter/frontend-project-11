import onChange from 'on-change';
import processView from './processView.js';
import modalView from './modalView.js';
import postsRender from './forms/posts/postsRender.js';
import feedsRender from './forms/feeds/feedsRender.js';
import getFormError from '../actions/getFormError.js';
import interfaceView from './interfaceView.js';

const render = (elements, i18Instance, state) => (path, value) => {
  switch (path) {
    case 'language':
      interfaceView(elements, state, i18Instance);
      break;
    case 'feeds':
      feedsRender(elements, state);
      break;
    case 'form.processState':
      processView(elements, value, state, i18Instance);
      break;
    case 'posts':
      postsRender(elements, state);
      break;
    case 'uiState.openPostId':
      modalView(elements, state);
      break;
    case 'processError':
      getFormError(elements, i18Instance);
      break;

    default:
      break;
  }
};

const watcher = (state, el, lang) => onChange(state, render(el, lang, state));

export default watcher;
