import cl from './GameWrapperPage.module.css';
import cn from 'classnames';
import React, { cloneElement, useState } from 'react';
import { GameWrapperPageProps } from './GameWrapperPage.props';
import { GameModalWindow } from '../../components/GameModalWindow/GameModalWindow';
import { LevelGroupWords } from '../../components/LevelGroupWords/LevelGroupWords';
import { useGetWords } from '../../customHooks/useGetWords';
import { GameLoader } from '../../components/GameLoader/GameLoader';
import { IUserWord, IWord } from '../../types/dataWordTypes';
import { GameStatistic } from '../../components/GameStatistic/GameStatistic';

export const GameWrapperPage = ({ dataGame, children, className, ...props }: GameWrapperPageProps): JSX.Element => {
  const { onLoading, listWords, isUserLogged, getWords } = useGetWords();
  const [resultWordsArr, setResultWordsArr] = useState<IWord[]>([]);
  const [userWord, setUserWord] = useState({} as IUserWord);
  const [onStart, setOnStart] = useState(false);
  const [endGame, setEndGame] = useState(false);

  const levelHandler = (group: number): void => {
    getWords(group);
    setOnStart(true);
  };

  const repeatGame = () => {
    setResultWordsArr([]);
    setEndGame(false);
    setOnStart(true);
  };

  const gameContent = (() => {
    if (children && !onLoading && onStart && listWords.length) {
      const gameProps = {
        words: listWords,
        quantityWords: listWords.length,
        isUserLogged: isUserLogged,
        setEndGame: setEndGame,
        resultWordsArr: resultWordsArr,
        setResultWordsArr: setResultWordsArr,
        userWord: userWord,
        setUserWord: setUserWord,
      };
      return cloneElement(children as React.ReactElement, gameProps);
    }
    return null;
  })();

  return (
    <>
      <main className={cn(className, cl.main)}>
        {(() => {
          if (!endGame) {
            if (onStart && listWords.length) {
              return <>{gameContent}</>;
            } else {
              return !onLoading ? (
                <GameModalWindow dataGame={dataGame}>
                  <LevelGroupWords levelHandler={levelHandler} />
                </GameModalWindow>
              ) : (
                <GameLoader />
              );
            }
          } else {
            return <GameStatistic resultWordsArr={resultWordsArr} repeatGame={repeatGame} />;
          }
        })()}
      </main>
    </>
  );
}