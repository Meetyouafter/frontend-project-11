import { v4 as uuidv4 } from 'uuid';
import parser from './parser';

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
  const parseData = parser(data);
  const posts = getPostsDataForNewPost(parseData);
  return posts;
};

export default observerParser;
