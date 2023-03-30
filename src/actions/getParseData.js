const parse = (content) => {
  const dataParser = new DOMParser();
  const parsedContent = dataParser.parseFromString(content, 'application/xml');
  const parseError = parsedContent.querySelector('parsererror');

  if (parseError) {
    const error = new Error(parseError.textContent);
    error.isParsing = true;
    throw error;
  }

  return parsedContent;
};

const getParseData = (content, linkName) => {
  const parsedContent = parse(content);

  const feedTitle = parsedContent.querySelector('title').textContent;
  const feedDescription = parsedContent.querySelector('description').textContent;
  const feed = {
    feedTitle, feedDescription, linkName,
  };

  const items = parsedContent.querySelectorAll('item');
  const posts = [...items].map((item) => {
    const title = item.querySelector('title').textContent;
    const description = item.querySelector('description').textContent;
    const link = item.querySelector('link').textContent;

    return {
      title, description, link,
    };
  });

  return { feedData: feed, postsData: posts };
};

export default getParseData;
