import { useEffect, useState, useCallback } from 'react';
import cn from 'classnames';
import { CountDownProps } from './CountDown.props';

export const CountDown = ({ className, seconds = 0, onPauseTimer, countDownHandler }: CountDownProps) => {
  const [time, setTime] = useState(seconds);

  const changeCount = useCallback(() => {
    const gameTime = seconds;
    if (time - 1 <= 0) {
      countDownHandler(true, gameTime);
    } else {
      setTime(time - 1);
    }
  }, [countDownHandler, seconds, time]);

  useEffect(() => {
    if(onPauseTimer) {
      const timerCountDouwn = setInterval(() => changeCount(), 1000);
      return () => clearInterval(timerCountDouwn);
    }
  }, [changeCount, onPauseTimer]);

  return (
    <div className={cn(className)}>
      <p>{time}</p>
    </div>
  );
};
