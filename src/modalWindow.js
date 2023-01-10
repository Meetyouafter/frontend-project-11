const modal = document.querySelector('.modal');
const container = modal.querySelector('.container');

document.querySelector('button').addEventListener('click', (e) => {
  modal.classList.remove('hidden');
});

document.querySelector('.modal').addEventListener('click', (e) => {
  if (e.target !== modal && e.target !== container) return;
  modal.classList.add('hidden');
});
