import React from 'react';
import styleWord from './Word.module.scss';
import cn from "classnames";

export default function Word() {
  const WordInfo = {};
  // const {
  //   id: string,
  //   group,
  //   page,
  //   word,
  //   image,
  //   audio,
  //   audioMeaning,
  //   audioExample,
  //   textMeaning,
  //   textExample,
  //   transcription,
  //   textExampleTranslate,
  //   textMeaningTranslate,
  //   wordTranslate: string,
  // } = WordInfo;

  return (
    <div className={cn(styleWord.Word)}>
      
    </div>
  )
}
