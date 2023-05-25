import cl from './GameStatistic.module.css';
import cn from 'classnames';
import { GameStatisticProps } from './GameStatistic.props';
import { playAudioWord } from '../../utils/audioPlayer';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';

export const GameStatistic = ({
  resultWordsArr,
  scoreGame,
  repeatGame,
  className,
}: GameStatisticProps): JSX.Element => {
  const quantityWords = resultWordsArr.length;
  const quantityCorrectWords = resultWordsArr.filter(({ correctAnswer }) => correctAnswer).length;

  return (
    <div className={cn(className, cl.game_statistic__wrapper)}>
      <div className={cn(cl.game_statistic)}>
        <h3 className={cn(cl.title)}>{'Результат тренировки'}</h3>
        {scoreGame ? <div className={cn(cl.sub_title)}>{`Количество набранных очков: ${scoreGame}`}</div> : ''}
        <div className={cn(cl.sub_title)}>{`Правильно выбранные слова: ${quantityCorrectWords}/${quantityWords}`}</div>
        <div className={cn(cl.statistic_table)}>
          <ul className={cn(cl.words_items)}>
            {resultWordsArr.map(({ audio, word, transcription, wordTranslate, correctAnswer }, index) => {
              return (
                <li className={cn(cl.word_item)} key={`statistic_word-${index}`}>
                  <div className={cn(cl.play_word)} onClick={() => playAudioWord(audio)}>
                    <VolumeUpIcon />
                  </div>
                  <div className={cn(cl.word_original)}>{word}</div>
                  <div className={cn(cl.word_transcription)}>{transcription}</div>
                  <div className={cn(cl.word_translate)}>{wordTranslate}</div>
                  <div
                    className={correctAnswer ? cn(cl.correct_answer, cl.correct) : cn(cl.correct_answer, cl.incorrect)}
                    title={correctAnswer ? 'Изучено' : 'Требуется повторение'}
                  >
                    {correctAnswer ? <ThumbUpIcon /> : <ThumbDownIcon />}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className={cn(cl.repeat_btn)} title={'Повторить игру'} onClick={() => repeatGame()}>
        <ReplayCircleFilledIcon />
      </div>
    </div>
  );
};
