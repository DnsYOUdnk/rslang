import cl from './GameStatistic.module.css';
import cn from 'classnames';
import { useState } from 'react';
import { GameStatisticProps } from './GameStatistic.props';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { playAudioWord } from '../../utils/audioPlayer';

export const GameStatistic = ({resultWordsArr, className}: GameStatisticProps): JSX.Element => {
  const [onPlayWord, setOnPlayWord] = useState<boolean>(false);

  return (
    <>
      <div className={cn(className, cl.game_statistic)}>
        <h3 className={cn(cl.title)}>
          {'Результат тренировки'}
        </h3>
        <div className={cn(cl.sub_title)}>
          {'Правильно выбранные слова: 3/10'}
        </div>
        <div className={cn(cl.statistic_table)}>
          <ul className={cn(cl.words_items)}>
            {resultWordsArr.map((element, index) => {
              return (
                <li className={cn(cl.word_item)} key={`statistic_word-${index}`}>
                  <div className={cn(cl.play_word)} onClick={() => playAudioWord(element.audio)}>
                    <VolumeUpIcon/>
                  </div>
                  <div className={cn(cl.word_original)}>
                    {element.word}
                  </div>
                  <div className={cn(cl.word_transcription)}>
                    {element.transcription}
                  </div>
                  <div className={cn(cl.word_translate)}>
                    {element.wordTranslate}
                  </div>
                  <div className={cn(cl.word_translate)}>
                    {element.correctAnswer ? 'yes' : 'no'}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}