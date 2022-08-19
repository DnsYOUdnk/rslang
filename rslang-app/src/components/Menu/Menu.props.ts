import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface MenuProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isOpenMenu: boolean;
  setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}