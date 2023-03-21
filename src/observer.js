import i18next from 'i18next';
import observerParser from './services/parser.js';
import { observerRender, watchedState } from './render/render.js';

const timer = (func, time) => setTimeout(func, time);

const observer = (state) => {
  const promises = state.feeds.map((url) => {
    const promise = fetch(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
      .then((response) => response.json())
      .then((data) => observerParser(data.contents))
      .then((posts) => {
        const titles = state.posts.map((post) => post.title);
        posts.filter((post) => {
          if (!titles.includes(post.title)) {
            state.newPosts.push(post);
            state.posts.push(post);
          }
          observerRender(state);
          state.newPosts.length = 0;
        });
      });
    return promise;
  });
  Promise.all(promises)
    .then(() => timer(() => observer(state), 5000))
    .catch(() => console.warn(i18next.t('network', { lng: watchedState.locale })));
};

export default observer;
