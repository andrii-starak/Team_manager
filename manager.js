import { allUsers, currentPlayer, participants } from './script.js';
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
    if (participants.length > 15) return;
    else {
      deletePlayerButton.disabled = false;
      participants.push(currentPlayer);
      const createdPlayerRow = document.createElement('p');
      createdPlayerRow.textContent = `${participants.length}. ${currentPlayer.name}`;
      playerTable.append(createdPlayerRow);
      inputPlayerName.value = '';
      disabler();
      addPlayerButton.disabled = true;
      console.log(participants);
    }
  };
  const deletePlayer = function () {};

  const addingPlayer = function () {
    let playerName = inputPlayerName.value;
    if (!playerName || allUsers.length > 15) return;
    else {
      const newParticipantName = inputPlayerName.value;
      const newParticipantIndex = Number(
        `${currentPlayer.id}${participants.length}`,
      );
      const newParticipant = {
        name: newParticipantName,
        id: newParticipantIndex,
      };

      deletePlayerButton.disabled = false;
      playerName = capitalizer(playerName);
      console.log(playerName);
      allUsers.push(playerName);
      participants.push(newParticipant);
      console.log(newParticipant);

      // Створюємо рядок для відображення гравця
      const playerRow = document.createElement('div');
      playerRow.classList.add('player-row');

      participants.push(newParticipant);
      playerRow.setAttribute('data-id', newParticipantIndex);
      // Додаємо порядковий номер
      const playerNumber = document.createElement('span');
      playerNumber.textContent = `${allUsers.length + 1}. `;
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
