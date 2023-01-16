/* eslint-disable no-console */
import getFeed from './getFeed';

const Parser = new DOMParser();

const observer = (feeds, content) => {
  let id2;
  const id = setTimeout(function run() {
    feeds.map((feed, index) => {
      fetch(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(feed)}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          clearTimeout(id);
          clearTimeout(id2);
          console.log('oops');
          return null;
        })
        .then((data) => {
          Parser.parseFromString(data.contents, 'text/html');
        })
        .then((newContent) => {
          if (newContent !== content[index]) {
            getFeed(feed);
          } else {
            return id;
          }
        })
        .catch((err) => {
          clearTimeout(id);
          clearTimeout(id2);
          throw new Error(err);
        });
      return id;
    });
    id2 = setTimeout(run, 20000);
  }, 20000);
  return id;
};

export default observer;
