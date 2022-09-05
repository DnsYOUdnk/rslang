import { IWord, IUserWord } from './../../../types/dataWordTypes';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface GameAudioCallProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  words?: IWord[];
  quantityWords?: number
  isUserLogged?: boolean;
  setEndGame?: React.Dispatch<React.SetStateAction<boolean>>;
  resultWordsArr?: IWord[];
  setResultWordsArr?: React.Dispatch<React.SetStateAction<IWord[]>>;
  userWord?: IUserWord;
  getUserWord?: (learnWord: IWord) => Promise<void>;
  changeUserWord?: (correct: boolean) => void;
}
