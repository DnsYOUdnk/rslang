import { IWord } from './../../../types/dataWordTypes';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface GameAudioCallProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  words?: IWord[];
  quantityWords?: number;
  setEndGame?: React.Dispatch<React.SetStateAction<boolean>>;
  resultWordsArr?: IWord[];
  setResultWordsArr?: React.Dispatch<React.SetStateAction<IWord[]>>;
}
