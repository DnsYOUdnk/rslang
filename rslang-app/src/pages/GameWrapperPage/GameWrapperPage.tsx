import cl from './GameWrapperPage.module.css';
import cn from 'classnames';
import React, { cloneElement, useCallback, useState } from 'react';
import { GameWrapperPageProps } from './GameWrapperPage.props';
import { GameModalWindow } from '../../components/GameModalWindow/GameModalWindow';
import { LevelGroupWords } from '../../components/LevelGroupWords/LevelGroupWords';
import { useGetWords } from '../../customHooks/useGetWords';
import { GameLoader } from '../../components/GameLoader/GameLoader';
import { IUserWord, IWord } from '../../types/dataWordTypes';
import { GameStatistic } from '../../components/GameStatistic/GameStatistic';
import { createUserWord } from '../../utils/createUserWord';

const RESET = 0;
const ONCE_PER_GAME = 1;

export const GameWrapperPage = ({ dataGame, children, className }: GameWrapperPageProps): JSX.Element => {
  const { onLoading, listWords, isUserLogged, getWords } = useGetWords();
  const [resultWordsArr, setResultWordsArr] = useState<IWord[]>([]);
  const [userWord, setUserWord] = useState({} as IUserWord);
  const [onStart, setOnStart] = useState(false);
  const [endGame, setEndGame] = useState(false);

  const getUserWord = useCallback(
    async (learnWord: IWord) => {
      if (!learnWord.userWord) {
        const res = await createUserWord(learnWord);
        const data = await res.json();
        setUserWord!(data);
      } else {
        setUserWord!({ wordId: learnWord._id, ...learnWord.userWord });
      }
    },
    [setUserWord],
  );

  const changeUserWord = useCallback(
    (correct: boolean) => {
      const newUserWord = JSON.parse(JSON.stringify(userWord));
      if (userWord && correct) {
        newUserWord.optional.countCorrectSeries = RESET;
        newUserWord.optional.isWordLearned = false;
      } else {
        newUserWord.optional.countCorrectSeries += ONCE_PER_GAME;
        newUserWord.optional.countLearn += ONCE_PER_GAME;
        const numberCorrectAnswer = newUserWord.difficulty === 'easy' ? 3 : newUserWord.difficulty === 'hard' ? 5 : 4;
        newUserWord.optional.isWordLearned = newUserWord.optional.countCorrectSeries >= numberCorrectAnswer;
      }
      newUserWord.optional.numberUses += ONCE_PER_GAME;
      setUserWord!(newUserWord);
    },
    [setUserWord, userWord],
  );

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
        getUserWord: getUserWord,
        changeUserWord: changeUserWord,
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
};
