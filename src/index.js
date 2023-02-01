import i18next from 'i18next';
import { inputSchema, repeatSchema } from './validation';
import changeLanguage from './translate/translate';
import watchedState from './state';
import observer from './observer';
import './style.css';
import { getContent } from './helper';
import app from './app';

const inputEl = document.querySelector('#floatingInput');
const divWithStatusEl = document.querySelector('.status');
const formEl = document.querySelector('.form');

formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = { feeds: inputEl.value };
  try {
    await inputSchema.validate(data);
    await repeatSchema(watchedState.feeds).validate(data.feeds);

    divWithStatusEl.innerText = i18next.t('rss.rss_done', { lng: watchedState.locale });

    divWithStatusEl.classList.remove('is-invalid');
    inputEl.classList.remove('is-invalid');
    inputEl.value = '';
    inputEl.focus();

    //await getContent(inputEl.value)
    await console.log(data.feeds)
    await getContent(data.feeds)
    //await app()


    // observer(watchedState.feeds, watchedState.contents);
  } catch (err) {
    divWithStatusEl.innerText = i18next.t(err.errors, { lng: watchedState.locale });
    changeLanguage(watchedState.locale, err.errors);
    divWithStatusEl.classList.add('is-invalid');
    inputEl.classList.add('is-invalid');
  }
});
