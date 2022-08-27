import { LevelGroupWordsProps } from './LevelGroupWords.props';
import cl from './LevelGroupWords.module.css';
import cn from 'classnames';

const LEVEL_GROUP_WORDS = 6;

export const LevelGroupWords = ({className, ...props}: LevelGroupWordsProps): JSX.Element => {
  const levelArr = new Array(LEVEL_GROUP_WORDS).fill(null)
  
  return (
    <div className={cn(className, cl.levelBtns)}>
      {levelArr.map((_, index) => {
        return (
          <div key={'levelBtn' + index} className={cn(cl['level_btn-' + index],cl.levelBtn)}>
            {index + 1}
          </div>
        )
      })}
    </div>
  );
};