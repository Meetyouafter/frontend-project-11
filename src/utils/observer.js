import axios from 'axios';
import parser from './parser.js';
import { getFeedsLinks, proxy } from './api.js';

const TIME_FOR_UPDATE = 5000;

const observer = (watchedState) => {
  const { posts } = watchedState;
  const feedsLinks = getFeedsLinks(watchedState);

  const promises = feedsLinks.map((link) => axios({
    url: proxy(link),
  })
    .then((response) => {
      const data = parser(response.data.contents, watchedState);
      const { postsData } = data;
      const postsLinks = watchedState.posts.map((post) => post.link);
      const newPosts = postsData.filter((post) => !postsLinks.includes(post.link));
      posts.unshift(...newPosts);
    })
    .catch((err) => {
      throw err;
    }));

  Promise.all(promises)
    .finally(() => setTimeout(() => observer(watchedState), TIME_FOR_UPDATE));
};

export default observer;
