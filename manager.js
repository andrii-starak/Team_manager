import { allUsers, currentPlayer, participants } from './script.js';
document.addEventListener('DOMContentLoaded', () => {
  const addPlayerButton = document.querySelector('.add_player');
  const addGuestButton = document.querySelector('.add_guest');
  const deletePlayerButton = document.querySelector('.delete_guest');
  const playerTable = document.querySelector('.player_table');
  const inputPlayerName = document.querySelector('#player-name');
  const numberOfPlayers = document.querySelector('.counter-number');
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

  const addToCounter = function () {
    let numberOfPlayersValue = parseInt(numberOfPlayers.textContent, 10);
    numberOfPlayersValue++;
    numberOfPlayers.textContent = numberOfPlayersValue;
  };
  const reduceCounter = function () {
    let numberOfPlayersValue = parseInt(numberOfPlayers.textContent, 10);
    numberOfPlayersValue--;
    numberOfPlayers.textContent = numberOfPlayersValue;
  };
  //----------------------------------поточного гравця додати
  const addingCurrentUser = function (currentPlayer) {
    if (participants.length > 15) return;
    else {
      console.log(currentPlayer);
      participants.push(currentPlayer);

      const createdPlayerRow = document.createElement('div');
      createdPlayerRow.classList.add('player-row');
      createdPlayerRow.classList.add('current-player-row');

      createdPlayerRow.setAttribute('data-id', currentPlayer.id);
      // Додаємо порядковий номер
      // const playerNumber = document.createElement('span');
      // playerNumber.textContent = `${participants.length}. `;
      // Додаємо ім'я гравця
      const playerNameElement = document.createElement('span');
      playerNameElement.textContent = currentPlayer.name;

      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-button');
      deleteButton.classList.add('hidden');

      const deleteIcon = document.createElement('img');
      deleteIcon.src = '/images/icons/cross-mark-svgrepo-com.svg';
      deleteIcon.width = 12;
      deleteIcon.height = 12;
      deleteIcon.alt = 'Видалити';
      deleteButton.appendChild(deleteIcon);
      // ---------------------
      playerTable.append(createdPlayerRow);
      // createdPlayerRow.appendChild(playerNumber);
      createdPlayerRow.appendChild(playerNameElement);
      createdPlayerRow.appendChild(deleteButton);

      inputPlayerName.value = '';
      deletePlayerButton.disabled = false;
      addPlayerButton.disabled = true;
      addToCounter();
      deleteButton.addEventListener('click', function () {
        reduceCounter();
        const playerIndex = participants.findIndex(
          someParticipent => someParticipent.id == currentPlayer.id,
        );
        if (playerIndex !== -1) {
          participants.splice(playerIndex, 1);
          document.querySelector('.current-player-row').remove();
        }
        addPlayerButton.disabled = false;
        console.log(participants);
      });
    }
  };
  // -----------------------------------------------------
  const addingGuest = function () {
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
      // Створюємо рядок для відображення гравця
      const playerRow = document.createElement('div');
      playerRow.classList.add('player-row');
      participants.push(newParticipant);
      playerRow.setAttribute('data-id', newParticipantIndex);
      // Додаємо порядковий номер
      // const playerNumber = document.createElement('span');
      // playerNumber.textContent = `${participants.length}. `;
      const playerNameElement = document.createElement('span');
      playerNameElement.textContent = playerName;
      addToCounter();
      // Додаємо кнопку для видалення гравця
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-button');
      deleteButton.classList.add('hidden');

      const deleteIcon = document.createElement('img');
      deleteIcon.src = '/images/icons/cross-mark-svgrepo-com.svg';
      deleteIcon.width = 12;
      deleteIcon.height = 12;
      deleteIcon.alt = 'Видалити';
      deleteButton.appendChild(deleteIcon);

      // подія для видалення гравця
      deleteButton.addEventListener('click', function () {
        reduceCounter();

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
      // playerRow.appendChild(playerNumber);
      playerRow.appendChild(playerNameElement);
      playerRow.appendChild(deleteButton);

      // Додаємо рядок до таблиці або контейнера, де ви хочете відображати гравців
      playerTable.appendChild(playerRow);
      inputPlayerName.value = '';
    }
  };

  const deletingPlayer = function () {
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
      button.classList.remove('hidden');
    });
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
