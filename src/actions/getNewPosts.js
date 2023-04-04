import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import getParseData from './getParseData.js';

const BASE_URL = 'https://allorigins.hexlet.app';

const proxy = (url) => {
  const proxyUrl = new URL('/get', BASE_URL);
  proxyUrl.searchParams.append('disableCache', 'true');
  proxyUrl.searchParams.append('url', url);
  return proxyUrl;
};

const addIdToFeedData = (content, linkName) => {
  const { feedData, postsData } = getParseData(content, linkName);
  const feedId = uuidv4();

  const feedDataWithId = {
    ...feedData,
    feedId,
  };

  const postDataWithId = postsData.map((el) => {
    el.feedId = feedId;
    el.idItem = uuidv4();
    return el;
  });

  return { feedData: feedDataWithId, postsData: postDataWithId };
};

const TIME_FOR_UPDATE = 5000;

const getNewPosts = (watchedState) => {
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
    .finally(() => setTimeout(() => getNewPosts(watchedState), TIME_FOR_UPDATE));
};

export default getNewPosts;
