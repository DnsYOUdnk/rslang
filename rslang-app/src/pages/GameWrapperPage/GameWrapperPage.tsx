import cl from './GameWrapperPage.module.css';
import cn from 'classnames';
import { useState } from 'react';
import { GameWrapperPageProps } from './GameWrapperPage.props';
import { GameModalWindow } from '../../components/GameModalWindow/GameModalWindow';
import { Header } from '../../components/Header/Header';
import { LevelGroupWords } from '../../components/LevelGroupWords/LevelGroupWords';
import { useGetWords } from '../../customHooks/useGetWords';
import { GameLoader } from '../../components/GameLoader/GameLoader';

export const GameWrapperPage = ({
  dataGame,
  children,
  className,
  ...props
}: GameWrapperPageProps): JSX.Element => {

  const [ onStart, setOnStart ] = useState(false);
  const {onLoading, number, getWords} = useGetWords();

  const levelHandler = (group: number): void => {
    getWords(group);
    setOnStart(true)
  }

  return (
    <>
      <main className={cn(className, cl.main)}>
        {(() => {
          if(onStart && number.length >= 30) {
            return (
              <div className={cl.games}>
                { children }
              </div>
            )
          } else {
            return !onLoading ?
              <GameModalWindow dataGame={ dataGame }>
                <LevelGroupWords levelHandler={levelHandler}/>
              </GameModalWindow> : 
              <GameLoader/>
          } })()}
      </main>
    </>
  )
}