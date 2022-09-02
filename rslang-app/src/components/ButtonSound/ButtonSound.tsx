import cl from './ButtonSound.module.css';
import cn from 'classnames';
import { ButtonSoundProps } from './ButtonSound.props';
import { Button } from '../Button/Button';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import { useEffect } from 'react';

export const ButtonSound = ({ handlerSoundChange, onSound, className, ...props }: ButtonSoundProps): JSX.Element => {
  
  useEffect(() => {
    const onKeypress = ({code}: {code: string}) => {
      if(code === 'KeyM') {
        handlerSoundChange()
      }
    };
    document.addEventListener('keypress', onKeypress);
    return () => {
      document.removeEventListener('keypress', onKeypress);
    };
  });

  return (
    <Button 
      title={'Выключить звук'}
      className={cn(className, cl.btn_sound)}
      onClick={() => handlerSoundChange()}>
      {!onSound ? <NotificationsActiveIcon/> : <NotificationsOffIcon/>}
    </Button>
  );
};
