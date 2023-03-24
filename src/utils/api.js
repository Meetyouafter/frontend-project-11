const getFeedsLinks = (state) => state.feeds.map((feed) => feed.linkName);

const proxy = (url) => {
  const proxyUrl = new URL('/get', 'https://allorigins.hexlet.app');
  proxyUrl.searchParams.append('disableCache', 'true');
  proxyUrl.searchParams.append('url', url);
  return proxyUrl;
};
  /*
  console.log({link});
  const url = new URL(link);
  console.log({url});
  return `https://allorigins.hexlet.app/get?disableCache=false&url=${encodeURIComponent(url)}`;
};
*/
export { getFeedsLinks, proxy };
