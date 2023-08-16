'use strict';
const header = document.querySelector('#homeContainer');
const modalOverlay = document.querySelector('#modalOverlay');
const modalLogInWindow = document.querySelector('#modalLogInWindow');
// Buttons
const enterBtn = document.querySelector('#enterBtn');
const logInPlayerBtn = document.querySelector('#logInPlayerBtn');
const signInBtn = document.querySelector('#signInBtn');
const closeOverlayBtn = document.querySelector('#closeOverlayBtn');
// Inputs
const loginInput = document.querySelector('#loginInput');
const passwordInput = document.querySelector('#passwordInput');
// Logic
const player1 = {
  playerName: 'Andrii',
  playerPass: '1',
};
const allUsers = [];

// Functions
const openOverlay = function () {
  modalOverlay.classList.remove('hidden');
};

const closeOverlay = function () {
  modalOverlay.classList.add('hidden');
};

const greetingUser = function () {
  const greeting = document.createElement('h2');
  greeting.classList.add('home-container');
  greeting.textContent = `Hello ${player1.playerName}!`;
  header.prepend(greeting);
  closeOverlay();
};

// Event Listeners
closeOverlayBtn.addEventListener('click', closeOverlay);

enterBtn.addEventListener('click', openOverlay);

modalOverlay.addEventListener('click', function (e) {
  if (e.target === modalOverlay) closeOverlay();
});

logInPlayerBtn.addEventListener('click', () => {
  if (
    loginInput.value === player1.playerName &&
    passwordInput.value === player1.playerPass
  ) {
    greetingUser();
  } else {
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = 'Будь ласка впишіть парвильний логін і пароль';
    errorMessage.style.backgroundColor = 'red';
    modalLogInWindow.style.backgroundColor = 'lightcoral';
    modalLogInWindow.insertBefore(errorMessage, modalLogInWindow.firstChild);
    setTimeout(() => {
      modalLogInWindow.style.backgroundColor = '';
      modalLogInWindow.removeChild(errorMessage);
    }, 3000);
  }
});
// Реєстрація
signInBtn.addEventListener('click', function () {
  const newUserIndex = allUsers.length + 1;
  const newUserName = `newUser${newUserIndex}`;
  // const newUserName = loginInput.value;
  const newUserPassword = passwordInput.value;
  if (!loginInput.value || !passwordInput.value) {
    console.log('Будь ласка, заповніть всі поля.');
  } else {
    const isNameTaken = allUsers.some(player => player.name === newUserName);
    if (isNameTaken) {
      console.log("Це ім'я вже зайняте.");
    } else {
      const newUser = {
        name: newUserName,
        password: passwordInput.value,
      };
      allUsers.push(newUser);
      console.log('User registered:', newUser);
      console.log(allUsers);
      greetingUser();
    }
  }
});
