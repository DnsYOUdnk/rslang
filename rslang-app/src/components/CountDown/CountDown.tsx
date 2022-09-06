import { useEffect, useState } from 'react';
import cn from 'classnames';
import { CountDownProps } from './CountDown.props';

export const CountDown = ({ className, seconds = 0, countDownHandler }: CountDownProps) => {
  const [time, setTime] = useState(seconds);

  const changeCount = () => {
    if (time - 1 <= 0) {
      countDownHandler(true);
    } else {
      setTime(time - 1);
    }
  };

  useEffect(() => {
    const timerCountDouwn = setInterval(() => changeCount(), 1000);
    return () => clearInterval(timerCountDouwn);
  });

  return (
    <div className={cn(className)}>
      <p>{time}</p>
    </div>
  );
};
