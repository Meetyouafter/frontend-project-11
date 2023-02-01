import onChange from 'on-change';

const app = () => {
  const state = {
    readedPosts: [],
  };

  const links = document.querySelectorAll('a');
  console.log('links', links)

  const render = (data) => {
    links.map((link) => {
      link.classList.remove('fw-bold');
      link.classList.add('fw-normal');
    });
  };

  const watchedState = onChange(state, render);

  const readPost = () => {
    watchedState.readedPosts.push(22);
  };

  links.map((link) => link.addEventListener('click', readPost));
};

export default app;
