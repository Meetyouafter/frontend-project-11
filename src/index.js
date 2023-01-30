import i18next from 'i18next';
import { inputSchema, repeatSchema } from './validation';
import changeLanguage from './translate/translate';
import watchedState from './state';
import { getFeed, getPosts } from './getFeed';
import observer from './observer';
import './style.css';

const inputEl = document.querySelector('#floatingInput');
const divWithStatusEl = document.querySelector('.status');
const formEl = document.querySelector('.form');

formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = { feeds: inputEl.value };
  const url = inputEl.value;
  try {
    await inputSchema.validate(data);
    await repeatSchema(watchedState.feeds).validate(data.feeds);

    divWithStatusEl.innerText = i18next.t('rss.rss_done', { lng: watchedState.locale });
    divWithStatusEl.classList.remove('is-invalid');
    inputEl.classList.remove('is-invalid');
    inputEl.value = '';
    inputEl.focus();

    const getData = async () => {
      await getFeed(url);
      await getPosts();
    };

    getData();
    // observer(watchedState.feeds, watchedState.contents);
  } catch (err) {
    divWithStatusEl.innerText = i18next.t(err.errors, { lng: watchedState.locale });
    changeLanguage(watchedState.locale, err.errors);
    divWithStatusEl.classList.add('is-invalid');
    inputEl.classList.add('is-invalid');
  }
});
