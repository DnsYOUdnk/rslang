import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface AnswerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  statusCode: number;
}
