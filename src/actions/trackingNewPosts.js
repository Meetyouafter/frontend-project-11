import axios from 'axios';
import getParseDataWithId from './getParseDataWithId.js';
import { proxy } from './form.js';

const TIME_FOR_UPDATE = 5000;

const trackingNewPosts = (watchedState) => {
  const { posts } = watchedState;
  const feedsLinks = watchedState.feeds.map((feed) => feed.linkName);

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
    .finally(() => setTimeout(() => trackingNewPosts(watchedState), TIME_FOR_UPDATE));
};

export default trackingNewPosts;
