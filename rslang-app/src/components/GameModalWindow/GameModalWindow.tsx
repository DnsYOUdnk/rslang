import { GameModalWindowProps } from './GameModalWindow.props';
import cl from './GameModalWindow.module.css';
import cn from 'classnames';

export const GameModalWindow = ({ dataGame, children, className, ...props }: GameModalWindowProps): JSX.Element => {
  return (
    <>
      <div className={cn(className, cl.game_modal)}>
        <div className={cl.game_description}>
          <h3 className={cl.title}>{dataGame.text}</h3>
          <p className={cl.description}>{dataGame.description}</p>
        </div>
        <div className={cl.game_start}>
          <p className={cl.description}>Выберите уровень сложности слов:</p>
          {children}
        </div>
      </div>
    </>
  )
};
