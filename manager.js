import { allUsers, currentPlayer } from './script.js';
document.addEventListener('DOMContentLoaded', () => {
  const addPlayerButton = document.querySelector('.add_player');
  const addGuestButton = document.querySelector('.add_guest');
  const deletePlayerButton = document.querySelector('.delete_guest');
  const playerTable = document.querySelector('.player_table');
  const inputPlayerName = document.querySelector('#player-name');

  //
  deletePlayerButton.disabled = true;

  // Functions
  const capitalizer = function (string) {
    const words = string
      .split(' ')
      .map(word => word[0].toUpperCase() + word.slice(1));
    const capitalizedString = words.join(' ');
    return capitalizedString;
  };

  const disabler = function () {
    deletePlayerButton.disabled = false;
  };

  const addingCurrentUser = function (currentPlayer) {
    if (allUsers.length > 15) return;
    else {
      deletePlayerButton.disabled = false;
      const createdPlayerRow = document.createElement('p');
      createdPlayerRow.textContent = `${allUsers.length}. ${currentPlayer.name}`;
      playerTable.append(createdPlayerRow);
      inputPlayerName.value = '';
      disabler();
      addPlayerButton.disabled = true;
    }
  };
  const deletePlayer = function () {};

  const addingPlayer = function () {
    let playerName = inputPlayerName.value;
    if (!playerName || allUsers.length > 15) return;
    else {
      deletePlayerButton.disabled = false;

      playerName = capitalizer(playerName);
      console.log(playerName);

      allUsers.push(playerName);

      // const createdPlayerRow = document.createElement('p');
      // createdPlayerRow.textContent = `${allUsers.length}. ${playerName}`;
      // playerTable.append(createdPlayerRow);

      // Створюємо рядок для відображення гравця
      const playerRow = document.createElement('div');
      playerRow.classList.add('player-row');

      // Додаємо порядковий номер
      const playerNumber = document.createElement('span');
      playerNumber.textContent = `${allUsers.length + 1}. `;

      // Додаємо айдішку для рядка
      // playerRow.id = `${currentPlayer.id}+${playerNumber.textContent}`;

      // Додаємо ім'я гравця
      const playerNameElement = document.createElement('span');
      playerNameElement.textContent = playerName;

      // Додаємо кнопку для видалення гравця
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-button');
      const deleteIcon = document.createElement('img');
      deleteIcon.src = '/images/icons/cross-mark-svgrepo-com.svg';
      deleteIcon.width = 12;
      deleteIcon.height = 12;
      deleteIcon.alt = 'Видалити';
      deleteButton.appendChild(deleteIcon);

      deleteButton.addEventListener('click', function () {});

      // Додаємо всі елементи до рядка
      playerRow.appendChild(playerNumber);
      playerRow.appendChild(playerNameElement);
      playerRow.appendChild(deleteButton);

      // Додаємо рядок до таблиці або контейнера, де ви хочете відображати гравців
      playerTable.appendChild(playerRow);

      inputPlayerName.value = '';
      disabler();
    }
  };

  const deletingPlayer = function () {
    const lastElementTable = playerTable.lastElementChild;
    lastElementTable.remove();
    addPlayerButton.disabled = false;
    allUsers.pop();
  };

  const addingGuest = function () {
    addingPlayer();
  };

  //
  // Event Listeners

  addPlayerButton.addEventListener('click', () => {
    addingCurrentUser(currentPlayer);
  });

  deletePlayerButton.addEventListener('click', () => deletingPlayer());

  addGuestButton.addEventListener('click', () => {
    addingGuest();
  });
});
// Open Team
