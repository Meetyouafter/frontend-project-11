import { elements } from '../consts.js';

const controllerButtons = (watchedState) => {
  const changeLanguage = (value, state) => {
    console.log(13);
    state.language = value;
  };

  elements.buttonEn.addEventListener('click', () => {
    changeLanguage('en', watchedState);
  });

  elements.buttonRu.addEventListener('click', () => {
    changeLanguage('ru', watchedState);
  });
};

export default controllerButtons;
