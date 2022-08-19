import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import cl from './Layout.module.css';

export const Layout = ( ): JSX.Element => {
    return (
      <div className={cl.wrapper}>
        <Header className={cl.header}></Header>
        <Outlet />
        <Footer className={cl.footer}></Footer>
      </div>
    );
};
