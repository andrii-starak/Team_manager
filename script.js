import './manager.js';
export const allUsers = [
  {
    name: 'Andrii',
    password: '1',
    id: 1,
  },
];
export let currentPlayer = {
  name: 'Andrii',
  password: '1',
  id: 1,
};
export const participants = [];
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('#homeContainer');
  // const header = document.querySelector('#home');
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
  //Menu
  const optionsMenu = document.querySelector('#optionsMenu');
  const optionsMenuTeam = document.querySelector('#optionsMenuTeam');
  const managerMenu = document.querySelector('#managerMenu');
  // export

  // Logic

  if (!currentPlayer) exitBtn.disabled = true;

  // Functions
  const defineCurrentPlayer = function (user) {
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

  const clearInputs = function () {
    loginInput.value = '';
    passwordInput.value = '';
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
    const userNameToFind = loginInput.value;
    const passwordToCheck = passwordInput.value;

    if (!userNameToFind || !passwordToCheck) {
      console.log('Будь ласка, заповніть всі поля.');
      return;
    }
    const isRegistered = allUsers.some(
      player =>
        player.name === loginInput.value &&
        player.password === passwordInput.value,
    );

    const foundUser = allUsers.find(user => user.name === userNameToFind);

    if (isRegistered) {
      console.log('Ви успішно увійшли');
      greetingUser(foundUser.name);
      enterBtn.disabled = true;
      exitBtn.disabled = false;
      clearInputs();
      defineCurrentPlayer(foundUser);
      console.log(`Поточний гравець ${currentPlayer.name}`);
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
      return;
    }

    const isNameTaken = allUsers.some(player => player.name === newUserName);
    if (isNameTaken) {
      alert("Це ім'я вже зайняте.");
      return;
    }

    const newUser = {
      name: newUserName,
      password: passwordInput.value,
      id: newUserIndex,
    };

    allUsers.push(newUser);
    console.log('User registered:', newUser);
    console.log(allUsers);
    greetingUser(newUser.name);
    clearInputs();
    defineCurrentPlayer(newUser);
    console.log(`CurrentUser is ${currentPlayer.name}`);
    enterBtn.disabled = true;
    exitBtn.disabled = false;
  });
  //Open Team menu
  optionsMenuTeam.addEventListener('click', function () {
    optionsMenu.classList.add('hidden');
    managerMenu.classList.remove('hidden');
  });
  //
});
