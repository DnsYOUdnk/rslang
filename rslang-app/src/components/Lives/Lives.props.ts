import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export interface LivesProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  countLives: number;
}
