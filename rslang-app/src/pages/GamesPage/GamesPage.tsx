import cl from './GamesPage.module.css';
import cn from 'classnames';
import { GamesPageProps } from './GamesPage.props';
import { Link } from 'react-router-dom';
import { getDataGames } from '../../dataGames/dataGames';

export const GamesPage = ({ className, ...props }: GamesPageProps): JSX.Element => {
  const links = getDataGames(cl.audio, cl.sprint);

  return (
    <main className={cn(className, cl.main)}>
      <div className={cl.games}>
        {links.map((item) => {
          return <Link to={item.link} className={cn(cl.learn__link, item.class)} key={item.id}>
            <div className={cl.learn__title}>{item.text}</div>
          </Link>
        })}
      </div>
    </main>
  )
}
