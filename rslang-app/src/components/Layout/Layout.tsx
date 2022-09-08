import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Context } from '../../utils/context';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import cl from './Layout.module.css';

export const Layout = (): JSX.Element => {
  const [isAuthorized, setIsAuthorized] = useState(() => {
    return localStorage.getItem('user') ? true : false;
  });
  return (
    <Context.Provider value={{ isAuthorized: isAuthorized, setIsAuthorized: setIsAuthorized }}>
      <div className={cl.wrapper}>
        <Header className={cl.header}></Header>
        <Outlet />
        <Footer className={cl.footer}></Footer>
      </div>
    </Context.Provider>
  );
};
