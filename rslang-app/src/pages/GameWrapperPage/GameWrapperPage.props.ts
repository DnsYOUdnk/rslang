import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { GameElement } from '../../types/dataGamesTypes';

export interface GameWrapperPageProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  dataGame: GameElement;
};