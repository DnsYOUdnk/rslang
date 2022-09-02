import cl from './GameWrapperPage.module.css';
import cn from 'classnames';
import React, { cloneElement, useState } from 'react';
import { GameWrapperPageProps } from './GameWrapperPage.props';
import { GameModalWindow } from '../../components/GameModalWindow/GameModalWindow';
import { Header } from '../../components/Header/Header';
import { LevelGroupWords } from '../../components/LevelGroupWords/LevelGroupWords';
import { useGetWords } from '../../customHooks/useGetWords';
import { GameLoader } from '../../components/GameLoader/GameLoader';
import { IWord } from '../../types/dataWordTypes';

export const GameWrapperPage = ({
  dataGame,
  children,
  className,
  ...props
}: GameWrapperPageProps): JSX.Element => {

  const [ onStart, setOnStart ] = useState(false);
  const {onLoading, listWords, getWords} = useGetWords();

  const levelHandler = (group: number): void => {
    getWords(group);
    setOnStart(true)
  }

  interface IGameProps {
    words: IWord[];
  }

  const gameContent = (() => {
    if (children && !onLoading && onStart && listWords.length >= 30) {
      const gameProps = {
        words: listWords
      }
      return cloneElement(children as React.ReactElement<IGameProps>, gameProps)
    }
    return null
  })()

  return (
    <>
      <main className={cn(className, cl.main)}>
        {(() => {
          if(onStart && listWords.length >= 30) {
            return (
              <>
                { gameContent }
              </>
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