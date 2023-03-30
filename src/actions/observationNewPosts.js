import axios from 'axios';
import addIdToFeedData from './addIdToFeedData.js';
import { proxy } from './getFeedData.js';

const TIME_FOR_UPDATE = 5000;

const observationNewPosts = (watchedState) => {
  const { posts } = watchedState;
  const feedsLinks = watchedState.feeds.map((feed) => feed.linkName);

  const promises = feedsLinks.map((link) => axios({
    url: proxy(link),
  })
    .then((response) => {
      const data = addIdToFeedData(response.data.contents);
      const { postsData } = data;
      const postsLinks = watchedState.posts.map((post) => post.link);
      const newPosts = postsData.filter((post) => !postsLinks.includes(post.link));
      posts.unshift(...newPosts);
    })
    .catch((err) => {
      throw err;
    }));

  Promise.all(promises)
    .finally(() => setTimeout(() => observationNewPosts(watchedState), TIME_FOR_UPDATE));
};

export default observationNewPosts;
