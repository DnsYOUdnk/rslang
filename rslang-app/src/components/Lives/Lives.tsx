import cn from 'classnames';
import cl from './Lives.module.css';
import { LivesProps } from './Lives.props';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const DEFAULT_MAX_LIVES = 5;

export const Lives = ({ className, ...props }: LivesProps): JSX.Element => {


  return (
    <ul className={cn(className,cl.games__lives)}>
      {new Array(DEFAULT_MAX_LIVES).fill(null).map((_, index) => {
        return (
          <li className={cn(className,cl.games__live)} key={`live-${index}`}><FavoriteIcon/></li>
        )
      })}
    </ul>
  );
};