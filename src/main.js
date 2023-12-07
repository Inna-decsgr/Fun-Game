'use strict';

import PopUp from './popup.js';
import * as sound from './sound.js';
import { GameBuilder, Reason } from './game.js';


const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  startGame();
  gameFinishBanner.failhide();
  showGameButton();
  heartCount = 0;
})

const game = new GameBuilder()
.widthGameDuration(20)
.withBackpackCount(15)
.withElseCount(2)
.build();

game.setGameStopListener((reason) => {
  let message;
  switch(reason) {
    case Reason.cancel:
      message = '다시 한번 시도해보세요'
      sound.playAlert();
      break;
    case Reason.win:
      message = '짱구를 다 찾았어요!'
      sound.playwin();
      break;
    case Reason.lose:
      message = '이런 다 찾지 못했어요ㅠ'
      sound.playElse();
      break;
    default:
      throw new Error('not valid reason');
  }
  gameFinishBanner.showWithText(message);
});
gameFinishBanner.setClickListener(() => {
  game.start();
})





