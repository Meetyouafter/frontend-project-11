import getFeed from './getFeed';

const Parser = new DOMParser();

const id = (feeds, content) => setTimeout(() => {
  observer(feeds, content);
}, 5000);

const observer = (feeds, content) => {
  const fn = feeds.map((feed, index) => {
    fetch(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(feed)}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        clearTimeout(id);
        console.log('oops');
      })
      .then((data) => {
        Parser.parseFromString(data.contents, 'text/html');
      })
      .then((newContent) => {
        if (newContent !== content[index]) {
          getFeed(feed);
        }
      })
      .then(id(feeds, content));
  });
  return fn;
};

export default observer;
