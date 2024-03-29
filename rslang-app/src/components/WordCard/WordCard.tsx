import React, { useEffect, useRef, useState } from 'react';
import { Word, User } from '../../types/types';
import { createUserWord, updateUserWord } from '../../utils/api';
import cl from './WordCard.module.css';
import cn from 'classnames';
import trueIcon from '../../assets/icons/true.svg';
import falseIcon from '../../assets/icons/false.svg';

const URL = 'https://react-learn-language.herokuapp.com';

type Props = {
  info: Word;
  audio: {
    audiotrack: HTMLAudioElement | null;
    setAudiotrack: React.Dispatch<React.SetStateAction<HTMLAudioElement | null>>;
  };
  authorization: {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
  };
  wordState: {
    wordChanged: boolean;
    setWordChanged: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

export default function WordCard({ info, audio, authorization, wordState }: Props) {
  //  Audio section -------------
  const audioWord = useRef(new Audio());
  const audioMeaning = useRef(new Audio());
  const audioExample = useRef(new Audio());

  const playAudio = () => {
    if (audio.audiotrack) {
      audio.audiotrack.pause();
      const track = audio.audiotrack;
      track.currentTime = 0;
      audio.setAudiotrack(null);
    }
    audio.setAudiotrack(audioWord.current);
  };
  const audioWordEnded = () => audio.setAudiotrack(audioMeaning.current);
  const audioMeaningEnded = () => audio.setAudiotrack(audioExample.current);
  const audioExampleEnded = () => audio.setAudiotrack(null);

  useEffect(() => {
    if (audio.audiotrack) audio.audiotrack.play();
  }, [audio]);

  //  Words section -------------
  const [isWordDifficult, setIsWordDifficult] = useState(info.userWord?.difficulty === 'hard');
  const [isWordLearned, setIsWordLearned] = useState(Boolean(info.userWord?.optional?.isWordLearned));

  //  console.log('authorization: ', authorization.user?.userId, authorization.user?.token);

  const addToDifficultWords = async () => {
    if (authorization.user) {
      if (!info.userWord) {
        info.userWord = {
          difficulty: 'hard',
          optional: {},
        };
        await createUserWord(info.id || info._id, authorization.user.userId, authorization.user.token, info.userWord);
      }

      if (info.userWord) {
        info.userWord.difficulty = 'hard';
        delete info.userWord.optional.isWordLearned;
        await updateUserWord(info.id || info._id, authorization.user.userId, authorization.user.token, info.userWord);
      }
    }
  };

  const deleteFromDifficultWords = async () => {
    if (authorization.user) {
      if (info.userWord) {
        info.userWord.difficulty = 'easy';
        await updateUserWord(info.id || info._id, authorization.user.userId, authorization.user.token, info.userWord);
      }
    }
  };

  const changeWordDifficulty = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      addToDifficultWords();
      setIsWordLearned(false);
    }
    if (!event.target.checked) deleteFromDifficultWords();
    setIsWordDifficult(!isWordDifficult);
    wordState.setWordChanged(true);
  };
  const addToLearnedWords = async () => {
    if (authorization.user) {
      if (!info.userWord) {
        info.userWord = {
          difficulty: 'easy',
          optional: {
            learned: new Date().toLocaleDateString(),
          },
        };
        await createUserWord(info.id || info._id, authorization.user.userId, authorization.user.token, info.userWord);
      }

      if (info.userWord) {
        info.userWord.difficulty = 'easy';
        info.userWord.optional = JSON.parse(
          JSON.stringify({ ...info.userWord.optional, learned: new Date().toLocaleDateString() }),
        ) as {
          [key: string]: unknown;
        };
        await updateUserWord(info.id || info._id, authorization.user.userId, authorization.user.token, info.userWord);
      }
    }
  };

  const deleteFromLearnedWords = async () => {
    if (authorization.user) {
      if (info.userWord) {
        info.userWord.difficulty = 'easy';
        delete info.userWord.optional.learned;
        await updateUserWord(info.id || info._id, authorization.user.userId, authorization.user.token, info.userWord);
      }
    }
  };
  const changeLearnedWords = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      addToLearnedWords();
      setIsWordDifficult(false);
    }
    if (!event.target.checked) deleteFromLearnedWords();
    setIsWordLearned(!isWordLearned);
    wordState.setWordChanged(true);
  };

  return (
    <div className={cn(cl.wordCard, isWordDifficult ? cl.difficult : isWordLearned ? cl.wordCardMark_learned : '')}>
      <div className={cl.wordCard__pictureWrap}>
        <img
          className={cn(cl.wordCard__word_1, cl.wordCard__picture)}
          src={`${URL}/${info.image}`}
          alt={`${info.word}_picture`}
        />
      </div>

      <div className={cl.wordCard__content}>
        <button className={cl.wordCard__audio} onClick={playAudio}></button>
        <audio src={`${URL}/${info.audio}`} ref={audioWord} onEnded={audioWordEnded}></audio>
        <audio src={`${URL}/${info.audioMeaning}`} ref={audioMeaning} onEnded={audioMeaningEnded}></audio>
        <audio src={`${URL}/${info.audioExample}`} ref={audioExample} onEnded={audioExampleEnded}></audio>
        <div className={cl.wordCard__word}>
          <p className={cn(cl.wordCard__wordEn, cl.wordCardChapter_2)}>
            {info.word}
            <span className={cl.wordCard__wordTranscription}>{info.transcription}</span>
          </p>
          <p className={cl.wordCard__word__wordTranslate}>{info.wordTranslate}</p>
        </div>
        <div className={cl.wordCard__word__wordMeaning}>
          <p className={cl.wordCard__word__wordMeaning} dangerouslySetInnerHTML={{ __html: `${info.textMeaning}` }}></p>
          <p className={cl.wordCard__word__wordMeaningRu}>{info.textMeaningTranslate}</p>
        </div>
        <div className={cl.wordCard__word__wordExample}>
          <p
            className={cl.wordCard__word__wordExampleEn}
            dangerouslySetInnerHTML={{ __html: `${info.textExample}` }}
          ></p>
          <p className={cl.wordCard__word__wordExample}>{info.textExampleTranslate}</p>
        </div>
      </div>

      {!authorization.user ? (
        <div></div>
      ) : (
        <div className={cl.wordCard__additionallyWrap}>
          <div className={cl.wordCard__additionally}>
            <div className={cl.wordCard__answers}>
              <img title='Кол-во правильных ответов' src={trueIcon} alt='RightAnswers' width={30} height={30}></img>
              <span title='Кол-во правильных ответов' className={cl.wordCard__rightAnswers}>
                {info.userWord?.optional?.countLearn || 0}
              </span>
              <img title='Кол-во неправильных ответов' src={falseIcon} alt='WrongAnswers' width={25} height={25}></img>
              <span title='Кол-во неправильных ответов' className={cl.wordCard__wrongAnswers}>
                {info.userWord?.optional?.countLearn || 0}
              </span>
            </div>

            <div className={cl.wordCard__marks}>
              <label
                className={cn(cl.wordCardMark, isWordDifficult ? cl.wordCardMark_difficult : '')}
                htmlFor={`difficult_word_${info.id || info._id}`}
              >
                <input
                  className={cl.wordCardMark__checkbox}
                  id={`difficult_word_${info.id || info._id}`}
                  value='hard'
                  type='checkbox'
                  onChange={changeWordDifficulty}
                  checked={isWordDifficult}
                />
                <span className={cl.wordCardMark__mark}></span>
                <span className={cl.wordCardMark__name}>Сложное</span>
              </label>

              <label
                className={cn(cl.wordCardMark, isWordLearned ? cn(cl.wordCardMark_learned) : '')}
                htmlFor={`learned_word_${info.id || info._id}`}
              >
                <input
                  className={cl.wordCardMark__checkbox}
                  id={`learned_word_${info.id || info._id}`}
                  value='learned'
                  type='checkbox'
                  onChange={changeLearnedWords}
                  checked={isWordLearned}
                />
                <span className={cl.wordCardMark__mark}></span>
                <span className={cl.wordCardMark__name}>Изученное</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
