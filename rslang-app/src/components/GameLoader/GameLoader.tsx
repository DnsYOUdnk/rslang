import cn from 'classnames';
import cl from './GameLoader.module.css';
import Lottie from 'lottie-react';
import { GameLoaderProps } from './GameLoader.props';
import gameLoading from './../../assets/json-animation/game_loading-1.json';

export const GameLoader = ({ className }: GameLoaderProps): JSX.Element => {
  return (
    <Lottie className={cn(className, cl.game_loader)} animationData={gameLoading} loop={true} />
  );
};
