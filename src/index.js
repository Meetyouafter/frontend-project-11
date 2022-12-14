import { inputSchema, stateSchema } from './validation';
import state from './state';
import { enDictionary, ruDictionary } from './translate';
import './style.css'

console.log(enDictionary)
console.log(ruDictionary)
console.log(typeof ruDictionary)

const inputEl = document.querySelector('#floatingInput');
const divWithStatusEl = document.querySelector('.status');
const formEl = document.querySelector('.form');

formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    let data = { link: inputEl.value };

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

