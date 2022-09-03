import cl from './GameStatistic.module.css';
import cn from 'classnames';
import { useState } from 'react';
import { GameStatisticProps } from './GameStatistic.props';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { playAudioWord } from '../../utils/audioPlayer';

export const GameStatistic = ({className, ...props}: GameStatisticProps): JSX.Element => {
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
            <li className={cn(cl.word_item)}>
              <div className={cn(cl.play_word)} onClick={() => playAudioWord('sad')}>
                <VolumeUpIcon/>
              </div>
              <div className={cn(cl.word_original)}>
                {'name'}
              </div>
              <div className={cn(cl.word_transcription)}>
                {'[name]'}
              </div>
              <div className={cn(cl.word_translate)}>
                {'имя'}
              </div>
              <div className={cn(cl.word_translate)}>
                {'icon'}
              </div>
            </li>
            <li className={cn(cl.word_item)}>
              <div className={cn(cl.play_word)}>
                {'play_word'}
              </div>
              <div className={cn(cl.word_original)}>
                {'name'}
              </div>
              <div className={cn(cl.word_transcription)}>
                {'[name]'}
              </div>
              <div className={cn(cl.word_translate)}>
                {'имя'}
              </div>
              <div className={cn(cl.word_translate)}>
                {'icon'}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}