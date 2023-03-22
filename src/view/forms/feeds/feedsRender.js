import createFeedsHtml from './feeds_html.js';

const feedsRender = (elements, state) => {
  const { feeds } = elements;
  feeds.innerHTML = createFeedsHtml(state.feeds);
  elements.form.reset();
  elements.input.focus();
};

export default feedsRender;
