import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface TeamPersonProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  title: string;
  img: string;
  link: string;
  children: ReactNode;
}