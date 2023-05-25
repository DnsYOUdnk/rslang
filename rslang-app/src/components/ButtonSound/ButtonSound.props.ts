import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export interface ButtonSoundProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  handlerSoundChange: () => void;
  onSound: boolean;
}
