import cl from './ButtonSound.module.css';
import cn from 'classnames';
import { ButtonSoundProps } from './ButtonSound.props';
import { Button } from '../Button/Button';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';

export const ButtonSound = ({
  handlerSoundChange,
  onSound,
  className,
  ...props
}: ButtonSoundProps): JSX.Element => {
  return (
    <Button
      title={'Выключить звук (Нажми M)'}
      className={cn(className, cl.btn_sound)}
      onClick={() => handlerSoundChange()}
    >
      {!onSound ? <NotificationsActiveIcon /> : <NotificationsOffIcon />}
    </Button>
  );
};
