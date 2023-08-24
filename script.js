'use strict';
const header = document.querySelector('#homeContainer');
const modalOverlay = document.querySelector('#modalOverlay');
const modalLogInWindow = document.querySelector('#modalLogInWindow');
// Buttons
const enterBtn = document.querySelector('#enterBtn');
const exitBtn = document.querySelector('#exitBtn');
const logInPlayerBtn = document.querySelector('#logInPlayerBtn');
const signInBtn = document.querySelector('#signInBtn');
const closeOverlayBtn = document.querySelector('#closeOverlayBtn');
// Inputs
const loginInput = document.querySelector('#loginInput');
const passwordInput = document.querySelector('#passwordInput');
// Logic
// const player1 = {
//   playerName: 'Andrii',
//   playerPass: '1',
// };
const allUsers = [
  {
    name: 'Andrii',
    password: '1',
    id: 1,
  },
];
let currentPlayer;

if (!currentPlayer) exitBtn.disabled = true;

// Functions
const defineCurrentUser = function (user) {
  currentPlayer = user;
};
const openOverlay = function () {
  modalOverlay.classList.remove('hidden');
};

const closeOverlay = function () {
  modalOverlay.classList.add('hidden');
};

const greetingUser = function (userName) {
  const greeting = document.createElement('h2');
  greeting.classList.add('home-container');
  greeting.textContent = `Hello ${userName}!`;
  greeting.id = 'greeting';
  header.prepend(greeting);
  closeOverlay();
};

const exitUser = function () {
  const greetingEl = document.querySelector('#greeting');
  currentPlayer = null;
  if (greetingEl) {
    greetingEl.remove();
  }
  enterBtn.disabled = false;
  exitBtn.disabled = true;
};

// Event Listeners
closeOverlayBtn.addEventListener('click', closeOverlay);

enterBtn.addEventListener('click', openOverlay);
exitBtn.addEventListener('click', exitUser);

// Сховати вікно входу
modalOverlay.addEventListener('click', function (e) {
  if (e.target === modalOverlay) closeOverlay();
});

// Вхід
logInPlayerBtn.addEventListener('click', () => {
  const isRegistered = allUsers.some(
    player =>
      player.name === loginInput.value &&
      player.password === passwordInput.value,
  );

  if (isRegistered) {
    console.log('вже зареєстрований');
    const userNameToFind = loginInput.value;
    const foundUser = allUsers.find(user => user.name === userNameToFind);
    greetingUser(foundUser.name);
    enterBtn.disabled = true;
    exitBtn.disabled = false;
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
  const newUserName = loginInput.value;
  const newUserPassword = passwordInput.value;
  const newUserIndex = allUsers.length + 1;

  if (!loginInput.value || !passwordInput.value) {
    alert('Будь ласка, заповніть всі поля.');
  } else {
    const isNameTaken = allUsers.some(player => player.name === newUserName);
    if (isNameTaken) {
      alert("Це ім'я вже зайняте.");
    } else {
      const newUser = {
        name: newUserName,
        password: passwordInput.value,
        id: newUserIndex,
      };
      allUsers.push(newUser);
      console.log('User registered:', newUser);
      console.log(allUsers);
      greetingUser(newUser.name);
      currentPlayer = newUser;
      loginInput.value = '';
      passwordInput.value = '';
      defineCurrentUser(newUser);
      enterBtn.disabled = true;
      exitBtn.disabled = false;

      console.log(newUser);
    }
  }
});
