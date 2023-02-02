import { v4 as uuidv4 } from 'uuid';
import watchedState from './state';

const getPostsData = (items, id) => items.map((item) => {
  const title = item.querySelector('title').textContent;
  const description = item.querySelector('description').textContent;
  const link = item.querySelector('link').textContent;
  watchedState.posts.push({
    title, description, link, id,
  });
  return {
    title, description, link, id,
  };
});

const getFeedData = (content) => {
  const id = uuidv4();
  const feedData = content.querySelector('channel');
  const feedTitleEl = feedData.querySelector('title').textContent;
  const feedDescriptionEl = feedData.querySelector('description').textContent;
  const feedItems = feedData.querySelectorAll('item');
  const itemsArray = Array.from(feedItems);
  const posts = getPostsData(itemsArray, id);
  watchedState.content.push({
    title: feedTitleEl, description: feedDescriptionEl, posts, id,
  });
  return {
    title: feedTitleEl, description: feedDescriptionEl, posts, id,
  };
};

const parser = (data) => {
  const Parser = new DOMParser();
  const parseData = Parser.parseFromString(data, 'application/xml');
  getFeedData(parseData);
  return parseData;
};

export default parser;
