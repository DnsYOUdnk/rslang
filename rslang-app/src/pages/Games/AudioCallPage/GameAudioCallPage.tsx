import cl from './GameAudioCallPage.module.css';
import cn from 'classnames';
import { GameAudioCallProps } from './GameAudioCallPage.props';
import { useEffect, useState } from 'react';
import { CountDown } from '../../../components/CountDown/CountDown';
import { ButtonSound } from '../../../components/ButtonSound/ButtonSound';
import { ButtonFullscreen } from '../../../components/ButtonFullScreen/ButtonFullscreen';
import { Lives } from '../../../components/Lives/Lives';

export const GameAudioCallPage = ({ className, ...props }: GameAudioCallProps) => {
  const {words} = props;
  const [startGame, setStartGame] = useState(false);
  const [onSound, setOnSound] = useState(false);

  const countDownHandler = (start: boolean): void => {
    setStartGame(start)
  }

  const handlerSoundChange = () => {
    setOnSound(!onSound);
  }

  return <>
    {!startGame && <CountDown className={cl.countDown} seconds = {3} countDownHandler={countDownHandler}/>}
    <div className={cn(className, cl.audiocall)}>
      <div className="games_panel">
        <div className="games__setting">
          <ButtonSound handlerSoundChange={handlerSoundChange} onSound={onSound}/>
          <ButtonFullscreen/>
        </div>
        <div className="games__setting-right">
          <Lives/>
          <div className="games__close">x</div>
        </div>
      </div>
      <div className="audiocall__container">
        <div className="audiocall__learn_word"></div>
        <ul className="audiocall__translation_words">
          <li className="audiocall__transition__word"></li>
          <li className="audiocall__transition__word"></li>
          <li className="audiocall__transition__word"></li>
          <li className="audiocall__transition__word"></li>
          <li className="audiocall__transition__word"></li>
        </ul>
        <div className="audiocall__button">
          <button className='button__next'></button>
        </div>
      </div>
    </div>
  </>
};
