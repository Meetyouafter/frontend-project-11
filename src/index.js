import { inputSchema, stateSchema, getLang, getLinks } from './validation';
import changeLanguage from './translate';
import i18next from "i18next";
import './style.css'

console.log(window.state)

const inputEl = document.querySelector('#floatingInput');
const divWithStatusEl = document.querySelector('.status');
const formEl = document.querySelector('.form');

formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    let data = { link: inputEl.value };
    getLinks()

    try {
      await inputSchema.validate(data);
      await stateSchema.validate(data.link);
      changeLanguage(window.state.language, 'compleate')
      divWithStatusEl.innerText = i18next.t('rss.rss_done',{ lng: window.state.language});
      window.state.link.push(data.link)
      divWithStatusEl.classList.remove('is-invalid');
      inputEl.classList.remove('is-invalid');
      inputEl.value = '';
    } catch (err) {
      divWithStatusEl.innerText = i18next.t(err.errors, { lng: window.state.language})
      changeLanguage(window.state.language, err.errors)
      divWithStatusEl.classList.add('is-invalid');
      inputEl.classList.add('is-invalid');
    }
})

const ButtonToEnLangEl = document.querySelector('.btn_enLang');
const ButtonToRuLangEl = document.querySelector('.btn_ruLang');

ButtonToEnLangEl.addEventListener('click', () => {
  window.state.language = 'en'
  changeLanguage(window.state.language)
});

ButtonToRuLangEl.addEventListener('click', () => {
  window.state.language = 'ru'
  changeLanguage(window.state.language)
  getLang()

  console.log(window.state)

});
