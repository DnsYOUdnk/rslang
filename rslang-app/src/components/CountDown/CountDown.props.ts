import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface CountDownProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  seconds: number;
  onPauseTimer: boolean;
  countDownHandler: (start: boolean, gameTime: number) => void;
}
