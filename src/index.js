import * as yup from 'yup';
import { inputSchema, stateSchema } from './validation';
import './style.css'

const state = {
  link: [],
};

const inputEl = document.querySelector('#floatingInput');
const divWithStatusEl = document.querySelector('.status');
const btnEl = document.querySelector('.btn');
const formEl = document.querySelector('.form');

formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    let data = { link: inputEl.value };

    const stateSchema = yup.mixed().notOneOf(state.link, 'RSS уже существует');

    try {
      await inputSchema.validate(data);
      await stateSchema.validate(data.link);
      divWithStatusEl.innerText = 'RSS успешно загружен';
      state.link.push(data.link)
      divWithStatusEl.classList.remove('is-invalid');
      inputEl.classList.remove('is-invalid');
      inputEl.value = '';
      console.log(data.link)
      console.log(state)

    } catch (err) {
      divWithStatusEl.innerText = err.errors;
      divWithStatusEl.classList.add('is-invalid');
      inputEl.classList.add('is-invalid');
      console.log(state)
    }
})

