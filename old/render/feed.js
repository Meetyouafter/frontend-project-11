const feedDataView = (contents) => {
  console.log(contents)
  const feedsEl = document.createElement('div');
  const contentForRender = contents[contents.length - 1];
  const bodyEl = document.querySelector('.body');
  const h2El = document.createElement('h2');
  const h3El = document.createElement('h3');
  h2El.textContent = contentForRender.title;
  h3El.textContent = contentForRender.description;
  feedsEl.append(h2El);
  feedsEl.append(h3El);
  bodyEl.append(feedsEl);
  return bodyEl;
};

export default feedDataView;
