'use strict';
const header = document.querySelector('#homeContainer');
const overlay = document.querySelector('#modalOverlay');
const modal = document.querySelector('.modal');
const logInBtn = document.querySelector('#logInBtn');
const logInPlayer = document.querySelector('#logInPlayer');
const signIn = document.querySelector('#signIn');
const closeOverlayButton = document.querySelector('#closeButton');
const loginInput = document.querySelector('#logInInput');
const loginPass = document.querySelector('#logInPassword');
const player1 = {
  playerName: 'Andrii',
  playerPass: '1',
};
const allPlayers = [player1];

const openOverlay = function () {
  overlay.classList.remove('hidden');
};
const loggingIn = function () {
  let currentUser = loginInput.value;
};
const closeOverlay = function () {
  overlay.classList.add('hidden');
};
closeOverlayButton.addEventListener('click', closeOverlay);

logInBtn.addEventListener('click', openOverlay);

overlay.addEventListener('click', function (e) {
  if (e.target === overlay) closeOverlay();
});
logInPlayer.addEventListener('click', () => {
  if (
    loginInput.value === player1.playerName &&
    loginPass.value === player1.playerPass
  ) {
    const greeting = document.createElement('h2');
    greeting.classList.add('home-container');
    greeting.textContent = `Hello ${player1.playerName}!`;
    header.prepend(greeting);
    closeOverlay();
  } else {
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = 'Будь ласка впишіть парвильний логін і пароль';
    errorMessage.style.backgroundColor = 'red';
    modal.style.backgroundColor = 'lightcoral';
    modal.insertBefore(errorMessage, modal.firstChild);
    setTimeout(() => {
      modal.style.backgroundColor = '';
      modal.removeChild(errorMessage);
    }, 3000);
  }
});

// const Player = function (playerName, playerPass) {
//   this.playerName = playerName;
//   this.playerPass = playerPass;
// };
