'use strict'
document.addEventListener('DOMContentLoaded', () => {

const playerButton = document.querySelector('.add_player')

const addedPlayer = function () {
    document.querySelector('.player_row').classList.add('activated');
}
playerButton.addEventListener('click', () => {
    addedPlayer()
})
});