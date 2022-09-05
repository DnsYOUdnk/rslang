import cn from 'classnames';
import { Outlet, useMatch } from 'react-router-dom';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import cl from './Layout.module.css';

export const Layout = (): JSX.Element => {
  const audio = useMatch('/games/audiocall');
  const sprint = useMatch('/games/sprint');
  return (
    <div className={cl.wrapper}>
      <Header
        className={cn(cl.header, {
          [cl.game_header]: audio || sprint,
        })}
      ></Header>
      <Outlet />
      {!(audio || sprint) && <Footer className={cl.footer}></Footer>}
    </div>
  );
};
