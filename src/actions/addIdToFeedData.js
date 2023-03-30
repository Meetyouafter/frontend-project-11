import { v4 as uuidv4 } from 'uuid';
import getParseData from './getParseData.js';

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

export default addIdToFeedData;
