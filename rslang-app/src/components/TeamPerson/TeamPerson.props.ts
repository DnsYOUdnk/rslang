import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface TeamPersonProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string;
  img: string;
  link: string;
  position: string;
  done: string;
  children: ReactNode;
}
