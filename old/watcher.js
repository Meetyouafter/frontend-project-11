import onChange from 'on-change';
import {
  renderFeedback, renderFeeds, renderOfReadPosts, renderPosts,
  renderModalWindow, renderLockForm, renderUnlockForm,
} from './render.js';
import feedDataView from './render/feed.js';

export default (state, i18n) => onChange(state, (path, value) => {
  console.log(path, value);
  switch (path) {
    case 'feeds':
      feedDataView(state.feeds);
      break;
    case 'uiState.viewedPost':
      renderModalWindow(value);
      break;
    case 'uiState.isRead': {
      renderOfReadPosts(value);
      break;
    }
    default:
      throw new Error();
  }
});
