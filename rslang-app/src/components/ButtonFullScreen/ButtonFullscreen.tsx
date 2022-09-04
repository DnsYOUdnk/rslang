import cn from 'classnames';
import cl from './ButtonFullscreen.module.css';
import { useState } from 'react';
import { ButtonFullscreenProps } from './ButtonFullscreen.props';
import { Button } from '../Button/Button';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';

export const ButtonFullscreen = ({
  audiocallPage,
  className,
}: ButtonFullscreenProps): JSX.Element => {
  const [onFullscreen, setOnFullscreen] = useState(false);

  const handlerFullscreenChange = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      audiocallPage!.requestFullscreen();
    }
    setOnFullscreen(!onFullscreen);
  };

  return (
    <Button
      title={onFullscreen ? 'Выход из полноэкранного режима' : 'Полноэкранный режим'}
      className={cn(className, cl.btn_fullscreen)}
      onClick={() => handlerFullscreenChange()}
    >
      {onFullscreen ? <CloseFullscreenIcon /> : <FullscreenIcon />}
    </Button>
  );
};
