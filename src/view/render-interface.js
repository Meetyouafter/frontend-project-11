const renderInterface = (elements, watchedState, i18next) => {
  const keys = Object.keys(elements.translate);
  const values = Object.values(elements.translate);

  for (let i = 0; i < keys.length; i += 1) {
    values[i].innerText = i18next.t(`interface.${keys[i]}`, { lng: watchedState.language });
  }
};

export default renderInterface;
