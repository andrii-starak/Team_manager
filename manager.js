'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const addPlayerButton = document.querySelector('.add_player');
  const addGuestButton = document.querySelector('.add_guest');
  const deletePlayerButton = document.querySelector('.delete_guest');
  const playerTable = document.querySelector('.player_table');
  const inputPlayerName = document.querySelector('#player-name');
  const users = [];
  let playerAddedStatus = false;
  // Logic
  //
  deletePlayerButton.disabled = true;

  const capitalizer = function (string) {
    const words = string
      .split(' ')
      .map(word => word[0].toUpperCase() + word.slice(1));
    const capitalizedString = words.join(' ');
    return capitalizedString;
  };

  const disabler = function () {
    addPlayerButton.disabled = true;
    deletePlayerButton.disabled = false;
  };

  const addingPlayer = function () {
    let playerName = inputPlayerName.value;
    if (!playerName || users.length > 14) return;
    else {
      deletePlayerButton.disabled = false;

      playerName = capitalizer(playerName);
      console.log(playerName);
      users.push(playerName);
      const createdPlayerRow = document.createElement('p');
      createdPlayerRow.textContent = `${users.length}. ${playerName}`;
      playerTable.append(createdPlayerRow);
      inputPlayerName.value = '';
      disabler();
      if (users.length == 3) {
        disabler();
        addGuestButton.disabled = true;
      }
    }
  };

  const deletingPlayer = function () {
    const lastElementTable = playerTable.lastElementChild;
    lastElementTable.remove();
    addPlayerButton.disabled = false;
    users.pop();
  };

  const addingGuest = function () {
    addingPlayer();
  };

  addPlayerButton.addEventListener('click', () => {
    addingPlayer();
  });

  deletePlayerButton.addEventListener('click', () => deletingPlayer());

  addGuestButton.addEventListener('click', () => {
    addingGuest();
  });
});
