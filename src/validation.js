import * as yup from 'yup';

const inputSchema = yup.object().shape({
  link: yup
  .string('Введите корректный адрес RSS')
  .required('Введите адрес')
  .url('Введите корректный адрес RSS')
});


export { inputSchema };












/*
var res =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
let res2 = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

const validate = (state, inputEl, divStatusEl) => {
  if (state.adress === inputEl.value && inputEl.value !== '') {
    divStatusEl.innerText = 'RSS уже существует';
    divStatusEl.classList.add('is-invalid');
    inputEl.classList.add('is-invalid');
  } else if (inputEl.value === '') {
    divStatusEl.innerText = 'Введите адрес';
    divStatusEl.classList.add('is-invalid');
    inputEl.classList.add('is-invalid');
  } else if (inputEl.value !== res) {
    divStatusEl.innerText = 'Введите корректный адрес RSS';
    divStatusEl.classList.add('is-invalid');
    inputEl.classList.add('is-invalid');
  } else if (inputEl.value !== '') {
    state.adress = inputEl.value;
    divStatusEl.innerText = 'RSS успешно загружен';
    divStatusEl.classList.remove('is-invalid');
    inputEl.classList.remove('is-invalid');
    inputEl.value = '';
  }
};

export default validate;
*/


