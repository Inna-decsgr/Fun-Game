'use strict'

export default class PopUp {
  constructor (){
    this.popUpStart = document.querySelector('.game-start');
    this.popUpFail = document.querySelector('.pop-up');
    this.popUpText = document.querySelector('.pop-up-message');
    this.popUpRefresh = document.querySelector('.pop-up-refresh');
    this.popUpRefresh.addEventListener('click', () => {
      this.onClick && this.onClick();
      this.failhide();
      
    })
  }

  setClickListener(onClick){
    this.onClick = onClick;
  }

  starthide(){
    this.popUpStart.classList.add('game-start-hide');
  }

  showWithText(text){
    this.popUpText.innerText = text;
    this.popUpFail.classList.remove('game-start-hide');
  }

  startshow(){
    this.popUpStart.classList.remove('game-start-hide');
  }

  failshow(){
    this.popUpFail.classList.remove('game-start-hide');
  }
  failhide(){
    this.popUpFail.classList.add('game-start-hide');
  }
}