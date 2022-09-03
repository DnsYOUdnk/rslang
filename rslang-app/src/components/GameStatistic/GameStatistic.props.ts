import { IWord } from './../../types/dataWordTypes';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface GameStatisticProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  resultWordsArr: IWord[];
}
