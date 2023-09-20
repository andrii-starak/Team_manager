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

  // const disabler = function () {
  //   deletePlayerButton.disabled = false;
  // };

  const addingCurrentUser = function (currentPlayer) {
    if (participants.length > 15) return;
    else {
      console.log(currentPlayer);
      participants.push(currentPlayer);

      const createdPlayerRow = document.createElement('div');
      createdPlayerRow.classList.add('player-row');

      createdPlayerRow.setAttribute('data-id', currentPlayer.id);
      // Додаємо порядковий номер
      const playerNumber = document.createElement('span');
      playerNumber.textContent = `${participants.length}. `;
      // Додаємо ім'я гравця
      const playerNameElement = document.createElement('span');
      playerNameElement.textContent = currentPlayer.name;

      playerTable.append(createdPlayerRow);
      createdPlayerRow.appendChild(playerNumber);
      createdPlayerRow.appendChild(playerNameElement);

      inputPlayerName.value = '';
      deletePlayerButton.disabled = false;
      addPlayerButton.disabled = true;
    }
  };

  const addingPlayer = function () {
    let playerName = inputPlayerName.value;
    if (!playerName || participants.length > 15) return;
    else {
      const newParticipantName = inputPlayerName.value;
      const newParticipantIndex = Number(
        `${currentPlayer.id}${participants.length}`,
      );
      const newParticipant = {
        name: newParticipantName,
        id: newParticipantIndex,
      };

      playerName = capitalizer(playerName);

      console.log('Participants BEFORE delete:', participants);

      // Створюємо рядок для відображення гравця
      const playerRow = document.createElement('div');
      playerRow.classList.add('player-row');

      participants.push(newParticipant);
      playerRow.setAttribute('data-id', newParticipantIndex);
      // Додаємо порядковий номер
      const playerNumber = document.createElement('span');
      playerNumber.textContent = `${participants.length}. `;
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

      deleteButton.addEventListener('click', function () {
        const playerId = playerRow.getAttribute('data-id');
        const playerIndex = participants.findIndex(
          someParticipent => someParticipent.id == playerId,
        );
        console.log('------delete button was clicked-----');
        // Перевіряємо, чи гравця знайдено в масиві
        if (playerIndex !== -1) {
          // Видаляємо гравця з масиву participants
          participants.splice(playerIndex, 1);
          // Видаляємо рядок гравця з DOM
          playerRow.remove();
          console.log('Participants:', participants);
        }
      });

      // Додаємо всі елементи до рядка
      playerRow.appendChild(playerNumber);
      playerRow.appendChild(playerNameElement);
      playerRow.appendChild(deleteButton);

      // Додаємо рядок до таблиці або контейнера, де ви хочете відображати гравців
      playerTable.appendChild(playerRow);
      inputPlayerName.value = '';
    }
  };

  const deletingPlayer = function () {
    // const lastElementTable = playerTable.lastElementChild;
    // lastElementTable.remove();
    // addPlayerButton.disabled = false;
    // allUsers.pop();
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
