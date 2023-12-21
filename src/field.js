'use strict'

import * as sound from './sound.js';

const CHAR_SIZE = 50;

export const ItemType = Object.freeze({
  backpack: 'backpack',
  else:'else'
})

export default class Field{
  constructor(backpackCount, elseCount){
    this.backpackCount = backpackCount;
    this.elseCount = elseCount;
    this.gameField = document.querySelector('.game-field');
    this.fieldRect = this.gameField.getBoundingClientRect();
    this.onClick = this.onClick.bind(this);
    this.gameField.addEventListener('click', this.onClick);
  }

  
  setClickListener(onItemClick){
    this.onItemClick = onItemClick;
  }

  init() {
    this.gameField.innerHTML = '';
    this._addItem('backpack', this.backpackCount, 'img/backpack.png');
    this._addItem('else', this.elseCount, 'img/back.png');
    this._addItem('else', this.elseCount, 'img/heart.png');
    this._addItem('else', this.elseCount, 'img/hello.png');
    this._addItem('else', this.elseCount, 'img/hug.png');
    this._addItem('else', this.elseCount, 'img/marathon.png');
    this._addItem('else', this.elseCount, 'img/bling.png');
  }
  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - CHAR_SIZE;
    const y2 = this.fieldRect.height - CHAR_SIZE;
    for(let i = 0; i <= count; i++) {
      const item = document.createElement('img');
      item.setAttribute('class', className);
      item.setAttribute('src', imgPath);
      item.style.width = `50px`;
      item.style.height = `50px`;
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.position = 'absolute';
      item.style.top = `${y}px`;
      item.style.left = `${x}px`;
      this.gameField.appendChild(item);
    }
  }


  onClick(e) {
    const target = e.target;
    if(target.matches('.backpack')){
      target.remove();
      sound.playBackpack();
      this.onItemClick && this.onItemClick(ItemType.backpack);

    }else if(target.matches('.else')){
      target.remove();
      sound.playElse();
      this.onItemClick && this.onItemClick(ItemType.else)
    }
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
