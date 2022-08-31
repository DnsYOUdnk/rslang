import { IWord } from './../../../types/dataWordTypes';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface GameAudioCallProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  words?: IWord[];
};