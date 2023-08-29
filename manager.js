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

  const addingPlayer = function () {
    let playerName = inputPlayerName.value;
    if (!playerName || allUsers.length > 15) return;
    else {
      deletePlayerButton.disabled = false;

      playerName = capitalizer(playerName);
      console.log(playerName);
      allUsers.push(playerName);
      const createdPlayerRow = document.createElement('p');
      createdPlayerRow.textContent = `${allUsers.length}. ${playerName}`;
      playerTable.append(createdPlayerRow);
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
