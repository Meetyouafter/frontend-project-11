const elements = {
  body: document.querySelector('body'),
  form: document.querySelector('.rss-form'),
  input: document.querySelector('.form-control'),
  submitButton: document.querySelector('[type="submit"]'),
  buttonEn: document.querySelector('.btn_enLang'),
  buttonRu: document.querySelector('.btn_ruLang'),
  feeds: document.querySelector('.feeds'),
  posts: document.querySelector('.posts'),
  feedback: document.querySelector('.feedback'),
  modal: {
    modalContainer: document.querySelector('.modal'),
    title: document.querySelector('.modal-title'),
    description: document.querySelector('.modal-body'),
    readBtn: document.querySelector('.full-article'),
    closeBtn: document.querySelectorAll('[data-bs-dismiss="modal"]'),
  },
  translate: {
    description: document.querySelector('.description'),
    title: document.querySelector('.title'),
    label: document.querySelector('.label'),
    button: document.querySelector('.button'),
    example: document.querySelector('.example'),
    language: document.querySelector('.language'),
  },
};

const ProcessState = {
  Success: 'success',
  Error: 'error',
  Sending: 'sending',
  Idle: 'idle',
};

const TIME_UPDATA = 5000;

export { elements, ProcessState, TIME_UPDATA };
