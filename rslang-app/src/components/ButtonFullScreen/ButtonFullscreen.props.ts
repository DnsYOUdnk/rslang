import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export interface ButtonFullscreenProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  audiocallPage: HTMLDivElement | null;
}
