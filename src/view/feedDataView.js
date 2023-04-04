const feedHtml = (data, i18next, watchedState) => (`
    <div class="card border-0">
      <div class="card-body">
        <h2 class="card-title feeds-title h4">${i18next.t('interface.feedsTitle', { lng: watchedState.language })}</h2>
      </div>
      <ul class="list-group border-0 rounded-0">
        ${data.map((item) => (`
          <li class="list-group-item border-0 border-end-0">
            <h3 class="h6 m-0">${item.feedTitle}</h3>
            <p class="m-0 small text-black-50">${item.feedDescription}</p>
          </li>`)).join('')}
      </ul>
    </div>`);

const postHtml = (data, i18next, watchedState) => (`
    <div class="card border-0">
      <div class="card-body">
        <h2 class="card-title posts-title h4">${i18next.t('interface.postsTitle', { lng: watchedState.language })}</h2>
      </div>
      <ul class="list-group border-0 rounded-0">
        ${data.map((post) => (`
          <li class="list-group-item d-flex justify-content-between align-items-start border-0 border-end-0">
            <a href="${post.link}" class="fw-bold" data-id="${post.idItem}" target="_blank" rel="noopener noreferrer">
              ${post.title}
            </a>
            <button type="button" class="btn btn-outline-primary btn-sm" data-id="${post.idItem}" data-bs-toggle="modal" data-bs-target="#modal">
              Просмотр
            </button>
          </li>
        `)).join('')}
      </ul>
    </div>`);

const feedDataView = (elements, state, i18next) => {
  const { feeds, posts } = elements;

  feeds.innerHTML = feedHtml(state.feeds, i18next, state);
  elements.form.reset();
  elements.input.focus();

  if (state.uiState.visitedPosts.length > 0) {
    state.uiState.visitedPosts.forEach((id) => {
      const currentLink = document.querySelector(`a[data-id="${id}"]`);
      currentLink.classList.remove('fw-bold');
      currentLink.classList.add('fw-normal', 'link-secondary');
    });
  } else {
    posts.innerHTML = postHtml(state.posts, i18next, state);
  }
};

export default feedDataView;
