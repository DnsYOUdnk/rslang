import cl from './GameWrapperPage.module.css';
import cn from 'classnames';
import { GameWrapperPageProps } from './GameWrapperPage.props';
import { GameModalWindow } from '../../components/GameModalWindow/GameModalWindow';
import { Header } from '../../components/Header/Header';

export const GameWrapperPage = ({
  dataGame,
  children,
  className,
  ...props
}: GameWrapperPageProps): JSX.Element => {

  return (
    <>
      <main className={cn(className, cl.main)}>
        <div className={cl.games}>
          { children }
        </div>
        <GameModalWindow dataGame={ dataGame }/>
      </main>
    </>
  )
}