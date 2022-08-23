import styles from './GamesPage.module.css';
import cn from 'classnames';
import { GamesPageProps } from './GamesPage.props';

export const GamesPage = ({ className, ...props }: GamesPageProps): JSX.Element => {
  return (
    <main className={cn(className, styles.main)}>
      
    </main>
  )
}
