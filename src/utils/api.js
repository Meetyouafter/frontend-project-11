const getFeedsLinks = (state) => state.feeds.map((feed) => feed.linkName);

const proxy = (link) => {
  const url = new URL(link);
  return `https://allorigins.hexlet.app/get?disableCache=false&url=${encodeURIComponent(url)}`;
};

export { getFeedsLinks, proxy };
