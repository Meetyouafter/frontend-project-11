import elements from '../utils/elements.js';
import changeLanguage from '../locale/changeLanguages.js';

const localeButtonsAction = (watchedState) => {
  elements.buttonEn.addEventListener('click', () => {
    changeLanguage('en', watchedState);
  });

  elements.buttonRu.addEventListener('click', () => {
    changeLanguage('ru', watchedState);
  });
};

export default localeButtonsAction;
