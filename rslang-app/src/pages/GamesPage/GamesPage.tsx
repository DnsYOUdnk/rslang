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
          return <Link to={item.link} className={cn(cl.game__link, item.class)} key={item.id}>
            <div className={cl.game__background}>
              <div className={cl.game__img}></div>
            </div>
            <h3 className={cl.game__title}>{item.text}</h3>
            <div className={cl.game__description}>{item.description}</div>
          </Link>
        })}
      </div>
    </main>
  )
}
