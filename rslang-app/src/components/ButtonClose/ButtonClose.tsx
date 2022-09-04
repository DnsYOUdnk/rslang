import cn from 'classnames';
import cl from './ButtonClose.module.css';
import { Link } from 'react-router-dom';
import { ButtonCloseProps } from './ButtonClose.props';
import { Button } from '../Button/Button';
import CloseIcon from '@mui/icons-material/Close';

export const ButtonClose = ({ className, ...props }: ButtonCloseProps): JSX.Element => {
  return (
    <Link to={'/games'} title={'Закрыть'}>
      <Button className={cn(className, cl.btn_close)}>{<CloseIcon />}</Button>
    </Link>
  );
};
