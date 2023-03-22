const getFeedsLinks = (state) => state.feeds.map((feed) => feed.linkName);

const proxyUrl = (url) => `https://allorigins.hexlet.app/get?disableCache=false&url=${encodeURIComponent(url.trim())}`;

export { getFeedsLinks, proxyUrl };
