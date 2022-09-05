import React, { useEffect, useRef, useState } from 'react';
import { Word, UserData } from '../../common/types';
import { createUserWord, updateUserWord } from '../../utils/api';
import cl from './WordCard.module.css';
import cn from 'classnames';
// import falseIcon from '../../assets/icons/false.svg';
// import trueIcon from '../../assets/icons/true.svg';

const URL = 'https://react-learn-language.herokuapp.com';

type Props = {
  info: Word;
  audio: {
    audiotrack: HTMLAudioElement | null;
    setAudiotrack: React.Dispatch<React.SetStateAction<HTMLAudioElement | null>>;
  };
  authorization: {
    userData: UserData | null;
    setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
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
  const [isWordLearned, setIsWordLearned] = useState(Boolean(info.userWord?.optional?.learned));

  return (
    <div className={cl.wordCard}>
      <div className={cl.wordCard__pictureWrap}>
        <img
          className={cn(cl.wordCard__word_1, cl.wordCard__picture)}
          src={`${URL}/${info.image}`}
          alt={`${info.word}_picture`}
        />
      </div>
      <div className={cl.wordCard__content}>
        <button className={cl.wordCard__audio} onClick={playAudio}></button>
        <audio
          src={`${URL}/${info.audio}`}
          ref={audioWord}
          onEnded={audioWordEnded}
        ></audio>
        <audio
          src={`${URL}/${info.audioMeaning}`}
          ref={audioMeaning}
          onEnded={audioMeaningEnded}
        ></audio>
        <audio
          src={`${URL}/${info.audioExample}`}
          ref={audioExample}
          onEnded={audioExampleEnded}
        ></audio>
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
          <p className={cl.wordCard__word__wordExampleEn} dangerouslySetInnerHTML={{ __html: `${info.textExample}` }}></p>
          <p className={cl.wordCard__word__wordExample}>{info.textExampleTranslate}</p>
        </div>

        
      </div>
    </div>
  );
}
