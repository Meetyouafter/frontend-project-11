/* eslint-disable no-console */
import getFeed from './getFeed';

const Parser = new DOMParser();
const callback = (feeds, content) => observer(feeds, content);

const id = setTimeout(callback, 5000);

const observer = (feeds, content) =>
  feeds.map((feed, index) => {
    fetch(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(feed)}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        clearTimeout(id);
        console.log('oops');
        return null;
      })
      .then((data) => {
        Parser.parseFromString(data.contents, 'text/html');
      })
      .then((newContent) => {
        if (newContent !== content[index]) {
          getFeed(feed);
        }
      });
    return id;
  });

export default observer;
