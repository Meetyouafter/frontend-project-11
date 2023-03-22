import { v4 as uuidv4 } from 'uuid';

const getParsedRSS = (content, watchedState, linkName) => {
  const parser = new DOMParser();
  const parsedContent = parser.parseFromString(content, 'application/xml');
  const parseError = parsedContent.querySelector('parsererror');

  if (parseError) {
    const error = new Error(parseError.textContent);
    error.isParsing = true;
    throw error;
  }

  const feedTitle = parsedContent.querySelector('title').textContent;
  const feedDescription = parsedContent.querySelector('description').textContent;
  const feedId = uuidv4();
  const feed = {
    feedId, feedTitle, feedDescription, linkName,
  };

  const items = parsedContent.querySelectorAll('item');
  const posts = [...items].map((item) => {
    const idItem = uuidv4();
    const title = item.querySelector('title').textContent;
    const description = item.querySelector('description').textContent;
    const link = item.querySelector('link').textContent;

    return {
      feedId, title, description, link, idItem,
    };
  });

  return { feedData: feed, postsData: posts };
};

export default getParsedRSS;
