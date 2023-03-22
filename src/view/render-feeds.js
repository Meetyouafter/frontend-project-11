import createFeedsHtml from './create-feeds-html.js';

const renderFeeds = (elements, state) => {
  const { feeds } = elements;
  feeds.innerHTML = createFeedsHtml(state.feeds);
  elements.form.reset();
  elements.input.focus();
};

export default renderFeeds;
