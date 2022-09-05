import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

<<<<<<< HEAD
export interface TeamPersonProps extends DetailedHTMLProps<HTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
=======
export interface TeamPersonProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
>>>>>>> develop
  title: string;
  img: string;
  link: string;
  position: string;
  done: string;
  children: ReactNode;
}
