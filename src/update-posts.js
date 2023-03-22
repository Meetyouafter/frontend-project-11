import axios from 'axios';
import getParsedRSS from './parser.js';
import { getFeedsLinks, proxyUrl } from './utils.js';
import { TIME_UPDATA } from './consts.js';

const updatePosts = (watchedState) => {
  const { posts } = watchedState;
  const feedsLinks = getFeedsLinks(watchedState);

  const promises = feedsLinks.map((url) => axios({
    url: proxyUrl(url),
  })
    .then((response) => {
      const data = getParsedRSS(response.data.contents, watchedState);
      const { postsData } = data;
      const postsLinks = watchedState.posts.map((post) => post.link);
      const newPosts = postsData.filter((post) => !postsLinks.includes(post.link));
      posts.unshift(...newPosts);
    })
    .catch((err) => {
      throw err;
    }));

  Promise.all(promises)
    .finally(() => setTimeout(() => updatePosts(watchedState), TIME_UPDATA));
};

export default updatePosts;
