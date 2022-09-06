import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ModalProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
}
