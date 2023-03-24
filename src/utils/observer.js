import axios from 'axios';
import getParseDataWithId from './parser.js';
import proxy from './api.js';
import { getFeedsLinks } from './utils.js';

const TIME_FOR_UPDATE = 5000;

const observer = (watchedState) => {
  const { posts } = watchedState;
  const feedsLinks = getFeedsLinks(watchedState);

  const promises = feedsLinks.map((link) => axios({
    url: proxy(link),
  })
    .then((response) => {
      const data = getParseDataWithId(response.data.contents);
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
