import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { LinksGameElement } from '../../types/dataGamesTypes';

export interface GameWrapperPageProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  dataGame: LinksGameElement;
}
