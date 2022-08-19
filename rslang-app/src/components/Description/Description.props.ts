import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface DescriptionProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string;
  img: string;
  children: ReactNode;
}