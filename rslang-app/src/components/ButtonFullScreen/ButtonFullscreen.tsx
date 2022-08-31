import cn from 'classnames';
import cl from './ButtonFullscreen.module.css';
import { ButtonFullscreenProps } from './ButtonFullscreen.props';
import { Button } from '../Button/Button';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { useState } from 'react';

export const ButtonFullscreen = ({ className, ...props }: ButtonFullscreenProps): JSX.Element => {
  const [onFullscreen, setOnFullscreen] = useState(false);

  const handlerFullscreenChange = () => {
    if (onFullscreen) {
      document.exitFullscreen()
    } else {
      document.documentElement.requestFullscreen();
    }
    setOnFullscreen(!onFullscreen)
  }

  return (
    <Button title={'Во весь экран'} className={cn(className, cl.btn_fullscreen)} onClick= {() => handlerFullscreenChange()}>
      {<FullscreenIcon/>}
    </Button>
  );
};
