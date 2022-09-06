import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface AnswerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  statusCode: number;
}
