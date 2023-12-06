'use strict'

import Field, { ItemType } from './field.js';
import PopUp from './popup.js';
import * as sound from './sound.js'


export const Reason = Object.freeze({
  win:'win',
  lose:'lose',
  cancel:'cancel'
})

const gameFinishBanner = new PopUp();


export class GameBuilder {
  widthGameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }
  withBackpackCount(num) {
    this.backpackCount = num;
    return this;
  }
  withElseCount(num) {
    this.elseCount = num;
    return this;
  }
  build() {
    return new Game(
      this.gameDuration,
      this.backpackCount,
      this.elseCount
    );
  }
}

class Game{
  constructor(gameDuration, backpackCount, elseCount){
    this.gameDuration = gameDuration;
    this.backpackCount = backpackCount;
    this.elseCount = elseCount;

    this.gameScore = document.querySelector('.game-score');
    this.gameTimer = document.querySelector('.game-timer')
    this.buttons = document.querySelector('.buttons');
    this.hearts = document.querySelectorAll('.fa-heart');

    this.gamePlayGround = document.querySelector('.game-field')

    this.stopButton = document.querySelector('.game-stop-button');
    this.startButton = document.querySelector('.game-start-button');
    this.startButton.addEventListener('click', () => {
      gameFinishBanner.startshow();
    })
    this.OkButton = document.querySelector('.OkButton');
    this.OkButton.addEventListener('click', () => {
      if(this.started) {
        this.stop(Reason.cancel);
        sound.playAlert();
      }else {
        this.start();
      }
    })
    this.stopButton.addEventListener('click', () => {
      this.stopTimer();
      gameFinishBanner.showWithText('다시 한번 도전해보세요!')
      sound.playAlert();
      sound.stopBackground();
      this.hideGameButton();
      this.stopClick();
    })
    this.gameField = new Field(this.backpackCount, this.elseCount);
    this.gameField.setClickListener((item) => {
      this.onItemClick(item);
    })

    this.started = false;
    this.score = 0;
    this.timer = undefined;
    this.heartCount = 0;

  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }


start() {
  this.started = true;
  this.initGame(); 
  this.changeStartBtn(); 
  gameFinishBanner.starthide(); 
  this.startTimer(); 
  this.resetHeart(); 
  this.showGameButton();
  this.showTimerAndScore();
  this.activeClick();
  sound.playBackground();
}

stop() {
  this.started = false;
  this.stopTimer();  
  gameFinishBanner.failshow();  
  this.hideGameButton(); 
  sound.playAlert();
  sound.stopBackground();
  this.stopClick();
}

finish(win) {
  if(win) {
    sound.playwin();
  }else{
    sound.playElse();
  }
  this.started =false;
  this.stop();
  sound.stopBackground();
  gameFinishBanner.showWithText(win ? '다 찾았어요!' : '이런 다 찾지 못했네요ㅜ');
  this.stopClick();
}

onItemClick(item) {
  if(!this.started) {
    return;
  }
  if(item === ItemType.backpack) {
      this.score++;
      this.updateScoreBoard(this.score);
      if(this.score === this.backpackCount) {
        this.finish(Reason.win);
        this.stopClick();
      }
    }else if(item === ItemType.else) {
      this.removeHeart();
    }
}

initGame() {
  this.score = 0;
  this.updateScoreBoard(this.score);
  this.gameField.init();
  this.gameTimer.innerText = '0 : 15';
}


changeStartBtn() {
  this.startButton.classList.add('active');
  this.stopButton.classList.add('active');
}


startTimer() {
  let remainingTime = this.gameDuration;
  this.updateTimer(remainingTime);
  this.timer = setInterval(() => {
    if(remainingTime <= 0) {
      this.stop();
      this.finish(this.backpackCount === this.score);
      return;
    }
    this.updateTimer(--remainingTime);
  }, 1000)
}

updateTimer(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  this.gameTimer.innerText = `${minutes} : ${seconds}`;
}

updateScoreBoard(newScore) {
  this.gameScore.innerText = this.backpackCount - newScore;
}

hideGameButton() {
  this.buttons.style.visibility = 'hidden';
}

showGameButton() {
  this.buttons.style.visibility = 'visible';
}

removeHeart() {
  this.hearts[this.heartCount].classList.add('active');
  this.heartCount++;
  if(this.heartCount === 5) {
    this.finish(false);
    this.heartCount = 0;
    this.stopClick();
  }
}

stopTimer() {
  clearInterval(this.timer);
}


resetHeart() {
  this.hearts.forEach((heart) => {
    heart.classList.remove('active');
  })
  this.heartCount = 0;
}
showTimerAndScore() {
  this.gameTimer.style.visibility = 'visible';
  this.gameScore.style.visibility = 'visible';
}
hideTimerAndScore() {
  this.gameTimer.style.visibility = 'hidden';
  this.gameScore.style.visibility = 'hidden';
}
stopClick() {
  this.gamePlayGround.classList.add('game-field-stop')
}

activeClick() {
  this.gamePlayGround.classList.remove('game-field-stop')
}

}

