'use strict'

// sound
const backpackSound = new Audio('./sound/backpack_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.MP3');
const elseSound = new Audio('./sound/else_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');

export function playBackpack() {
  playSound(backpackSound);
}
export function playAlert() {
  playSound(alertSound);
}
export function playElse() {
  playSound(elseSound);
}
export function playwin() {
  playSound(winSound);
}
export function playBackground() {
  playSound(bgSound);
}
export function stopBackground() {
  stopSound(bgSound);
}


function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}