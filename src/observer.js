import { observerParser } from './parser.js';
import { observerRender, watchedState } from './render.js';

const timer = (func, time) => setTimeout(func, time);

const observer = (state) => {
  const promises = state.feeds.map((url) => {
    const promise = fetch(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
      .then((response) => response.json())
      .then((data) => observerParser(data.contents))
      .then((posts) => {
        const titles = watchedState.posts.map((post) => post.title);
        return posts.map((post) => (!titles.includes(post.title) ? watchedState.newPosts.push(post) : ''));
      })
      .then(() => observerRender(watchedState))
      .catch((error) => {
        console.warn(error);
      });
    return promise;
  });
  Promise.all(promises)
    .then(() => timer(() => observer(state), 5000))
    .catch(clearTimeout(timer));
};

export default observer;
