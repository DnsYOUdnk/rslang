import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Data } from '../../types/statisticType';

export interface ChartProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  statistic: Data;
}
