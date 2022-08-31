import cl from './GameAudioCallPage.module.css';
import cn from 'classnames';
import { GameAudioCallProps } from './GameAudioCallPage.props';
import { useEffect, useState } from 'react';
import { CountDown } from '../../../components/CountDown/CountDown';

export const GameAudioCallPage = ({ className, ...props }: GameAudioCallProps) => {
  const [startGame, setStartGame] = useState(false);

  const countDownHandler = (start: boolean): void => {
    setStartGame(start)
  }

  return <>
    {!startGame && <CountDown className={cl.countDown} seconds = {3} countDownHandler={countDownHandler}/>}
    hello
  </>
};
