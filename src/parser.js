import { v4 as uuidv4 } from 'uuid';

const getPostsData = (state, items, id) => items.map((item) => {
  const title = item.querySelector('title').textContent;
  const description = item.querySelector('description').textContent;
  const link = item.querySelector('link').textContent;
  state.posts.push({
    title, description, link, id,
  });
  return {
    title, description, link, id,
  };
});

const getFeedData = (state, content) => {
  const id = uuidv4();
  const feedData = content.querySelector('channel');
  const feedTitleEl = feedData.querySelector('title').textContent;
  const feedDescriptionEl = feedData.querySelector('description').textContent;
  const feedItems = feedData.querySelectorAll('item');
  const itemsArray = Array.from(feedItems);
  const posts = getPostsData(state, itemsArray, id);
  state.content.push({
    title: feedTitleEl, description: feedDescriptionEl, posts, id,
  });
  return {
    title: feedTitleEl, description: feedDescriptionEl, posts, id,
  };
};

const getParseData = (state, data) => {
  const Parser = new DOMParser();
  const parseData = Parser.parseFromString(data, 'application/xml');
  getFeedData(state, parseData);
  return parseData;
};

const getPostsDataForNewPost = async (content) => {
  const id = uuidv4();
  const feedData = await content.querySelector('channel');
  const feedItems = await feedData.querySelectorAll('item');
  const itemsArray = await Array.from(feedItems);

  return itemsArray.map((item) => {
    const title = item.querySelector('title').textContent;
    const description = item.querySelector('description').textContent;
    const link = item.querySelector('link').textContent;
    return {
      title, description, link, id,
    };
  });
};

const observerParser = (data) => {
  const Parser = new DOMParser();
  const parseData = Parser.parseFromString(data, 'application/xml');
  const posts = getPostsDataForNewPost(parseData);
  return posts;
};

export default getParseData;
export { observerParser };
