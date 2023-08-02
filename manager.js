'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const addPlayerButton = document.querySelector('.add_player');
  const guestButton = document.querySelector('.add_guest');
  const playerTable = document.querySelector('.player_table');
  const inputPlayerName = document.querySelector('#player-name');
  const users = [];
  let playerAddedStatus = false;

  // Logic
  //

  const capitalizer = function (string) {
    const words = string
      .split(' ')
      .map(word => word[0].toUpperCase() + word.slice(1));
    const capitalizedString = words.join(' ');
    return capitalizedString;
  };

  const addedPlayer = function () {
    let playerName = inputPlayerName.value;
    if (!playerName) return;
    else {
      playerName = capitalizer(playerName);
      console.log(playerName);

      const createdPlayerRow = document.createElement('p');
      createdPlayerRow.textContent = `${playerName}`;
      playerTable.append(createdPlayerRow);

      //   статус чи додавав цей користувач вже гравця
      playerAddedStatus = !playerAddedStatus;
      addPlayerButton.disabled = true;
    }
  };

  addPlayerButton.addEventListener('click', () => {
    addedPlayer();
  });
});
