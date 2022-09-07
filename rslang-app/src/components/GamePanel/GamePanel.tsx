import cn from 'classnames';
import cl from './GamePanel.module.css';
import { ButtonSound } from '../ButtonSound/ButtonSound';
import { ButtonFullscreen } from '../ButtonFullScreen/ButtonFullscreen';
import { GamePanelProps } from './GamePanel.props';
import { Button } from '../Button/Button';
import { Lives } from '../Lives/Lives';
import { ButtonClose } from '../ButtonClose/ButtonClose';

export const GamePanel = ({ className, ...props }: GamePanelProps): JSX.Element => {
  const { buttonSound, buttonFullScr, buttonEnd, buttonClose, lives } = props;
  const { handlerFunc, isOnSound } = buttonSound;
  const { fullScreenElement } = buttonFullScr;
  const { arrResultWords, minLearnedWords, onEndGame } = buttonEnd;

  return (
    <div className={cl.games_panel}>
      {(buttonSound.isEnable || buttonFullScr.isEnable) && (
        <div className={cn(cl.games__setting, cl.games__setting_left)}>
          {buttonSound.isEnable && <ButtonSound handlerSoundChange={handlerFunc} onSound={isOnSound} />}
          {buttonFullScr.isEnable && <ButtonFullscreen audiocallPage={fullScreenElement} />}
        </div>
      )}
      {buttonEnd.isEnable && arrResultWords && arrResultWords.length > minLearnedWords && (
        <div className={cn(cl.games__setting__btn_end)}>
          <Button onClick={() => onEndGame!(true)} title={'Завершить и получить результат игры'}>
            Завершить игру
          </Button>
        </div>
      )}
      {(buttonClose.isEnable || lives.isEnable) && (
        <div className={cn(cl.games__setting, cl.games__setting_right)}>
          {lives.isEnable && lives.countLives && <Lives countLives={lives.countLives} />}
          {buttonClose.isEnable && <ButtonClose />}
        </div>
      )}
    </div>
  );
};
