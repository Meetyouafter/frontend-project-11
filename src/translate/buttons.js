import { watchedState } from '../state';
import changeLanguage from './translate';

const ButtonToEnLangEl = document.querySelector('.btn_enLang');
const ButtonToRuLangEl = document.querySelector('.btn_ruLang');

ButtonToEnLangEl.addEventListener('click', () => {
  watchedState.locale = 'en';
  changeLanguage(watchedState.locale);
});

ButtonToRuLangEl.addEventListener('click', () => {
  watchedState.locale = 'ru';
  changeLanguage(watchedState.locale);
});
