import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface LevelGroupWordsProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  levelHandler: (page: number) => void;
}
