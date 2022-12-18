import { inputSchema, feedsSchema } from './validation';
import changeLanguage from './translate';
import i18next from "i18next";
import watchedState from './state';
import './style.css'
import getFeed from './getFeed';
import axios from 'axios';


const inputEl = document.querySelector('#floatingInput');
const divWithStatusEl = document.querySelector('.status');
const formEl = document.querySelector('.form');

formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  let data = { feeds: inputEl.value };
  try {
    await inputSchema.validate(data);
    await feedsSchema.validate(data.feeds);
    divWithStatusEl.innerText = i18next.t('rss.rss_done',{ lng: watchedState.locale});
    watchedState.feeds.push(data.feeds);
    divWithStatusEl.classList.remove('is-invalid');
    inputEl.classList.remove('is-invalid');
    inputEl.value = '';
    inputEl.focus();


/*
    axios.get(data.feeds)
    .then(function (response) {
    response.header("Access-Control-Allow-Origin", "*")

    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
*/


    getFeed(data.feeds)
  } catch (err) {
    divWithStatusEl.innerText = i18next.t(err.errors, { lng: watchedState.locale})
    changeLanguage(watchedState.locale, err.errors)
    divWithStatusEl.classList.add('is-invalid');
    inputEl.classList.add('is-invalid');
  }
})

const ButtonToEnLangEl = document.querySelector('.btn_enLang');
const ButtonToRuLangEl = document.querySelector('.btn_ruLang');

ButtonToEnLangEl.addEventListener('click', () => {
  watchedState.locale = 'en'
  changeLanguage(watchedState.locale)
});

ButtonToRuLangEl.addEventListener('click', () => {
  watchedState.locale = 'ru'
  changeLanguage(watchedState.locale)
});

