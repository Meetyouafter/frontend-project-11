import parser from './parser';

const observer = (url) => {
  const iter = () => {
    fetch(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
      .then((data) => parser(data.contents))
      .catch((err) => console.error(err))
      .then(() => setTimeout(() => iter(), 5000));
  };
  setTimeout(() => iter(), 5000);
};

export default observer;
