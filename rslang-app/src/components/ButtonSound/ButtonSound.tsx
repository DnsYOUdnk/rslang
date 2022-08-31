import cl from './ButtonSound.module.css';
import cn from 'classnames';
import { ButtonSoundProps } from './ButtonSound.props';
import { Button } from '../Button/Button';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';

export const ButtonSound = ({ className, ...props }: ButtonSoundProps): JSX.Element => {
  return (
    <Button className={cn(className, cl.btn_sound)}>
      {<NotificationsActiveIcon/>}
    </Button>
  );
};
