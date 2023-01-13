import watchedState from '../state';
import changeLanguage from './translate';

const buttonToEnLangEl = document.querySelector('.btn_enLang');
const buttonToRuLangEl = document.querySelector('.btn_ruLang');

buttonToEnLangEl.addEventListener('click', () => {
  watchedState.locale = 'en';
  changeLanguage(watchedState.locale);
});

buttonToRuLangEl.addEventListener('click', () => {
  watchedState.locale = 'ru';
  changeLanguage(watchedState.locale);
});
