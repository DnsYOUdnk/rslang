import { IWord } from './../../types/dataWordTypes';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface GamePanelProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  buttonSound: IButtonSound,
  buttonFullScr: IButtonFullScr,
  buttonEnd: IButtonEnd,
  buttonClose: IButtonClose,
  lives: ILives
}

export interface IButtonSound {
  isEnable: boolean, 
  handlerFunc: () => void, 
  isOnSound: boolean 
}

export interface IButtonFullScr {
  isEnable: boolean, 
  fullScreenElement: HTMLDivElement | null,
}

export interface IButtonEnd {
  isEnable: boolean, 
  arrResultWords: IWord[] | undefined,
  minLearnedWords: number,
  onEndGame: React.Dispatch<React.SetStateAction<boolean>> | undefined,
}

export interface IButtonClose {
  isEnable: boolean, 
}

export interface ILives {
  isEnable: boolean,
  countLives?: number,
}