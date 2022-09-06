import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface CountDownProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  seconds: number;
  countDownHandler: (start: boolean) => void;
}
