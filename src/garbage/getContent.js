import parser from './parser';

const getContent = (url) => {
  const bodyEl = document.querySelector('.body');
  fetch(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      const h1El = document.createElement('h1');
      h1El.textContent = 'Что-то пошло не так';
      bodyEl.prepend(h1El);
      throw new Error('Network response was not ok.');
    })
    .then((data) => parser(data.content))
    .then((content) => console.log('daaaaaaaaaaaaaa', content))
    .catch((error) => console.error(error));
};

const getFeedsPostsFromURL = (url) => fetch(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
  .then((response) => response.json())
  .catch(() => {
    throw new Error('Network error');
  })
  .then((responseData) => parser(responseData.contents))
  .then((parsedData) => console.log(parsedData))
  .catch((e) => {
    throw new Error(e.message);
  });

export { getContent, getFeedsPostsFromURL };
