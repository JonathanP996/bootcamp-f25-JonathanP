const card = document.getElementById('card');
const moreBtn = document.getElementById('moreBtn');
const backBtn = document.getElementById('backBtn');

moreBtn.addEventListener('click', () => {
  card.classList.add('flipped');
});

backBtn.addEventListener('click', () => {
  card.classList.remove('flipped');
});
