'use strict';
const overlay = document.querySelector('#modalOverlay');
// const modal = document.querySelector('.modal');
const logInBtn = document.querySelector('#logInBtn');
const signIn = document.querySelector('#signIn');
const closeOverlayButton = document.querySelector('#closeButton');

let currentUser = '';

const openOverlay = function () {
  overlay.classList.remove('hidden');
};
const closeOverlay = function () {
  overlay.classList.add('hidden');
};

logInBtn.addEventListener('click', openOverlay);
closeOverlayButton.addEventListener('click', closeOverlay);
