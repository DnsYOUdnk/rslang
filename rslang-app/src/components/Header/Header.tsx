import cn from 'classnames';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button';
import { Menu } from '../Menu/Menu';
import { Modal } from '../Modal/Modal';
import cl from './Header.module.css';
import { HeaderProps } from './Header.props';

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const closeOverlay = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as Element;
    if (target && target.classList.contains('Header_overlay__ijmMg')) {
      setIsOpenModal(!isOpenModal);
    }
  };

  const logOut = () => {
    setIsAuthorized(false);
    delete localStorage.user;
  };

  return (
    <header {...props} className={cn(className, cl.header)}>
      <nav className={cl.nav}>
        <Link to='/'>
          <h1 className={cl.logo}>RsLang</h1>
        </Link>

        <div className={cl.wrap}>
          {localStorage.user ? (
            <span className={cl.hello}>
              Привет, <b>{JSON.parse(localStorage.user).name}</b>
            </span>
          ) : (
            ''
          )}
          <Button
            className={cl.login}
            onClick={() => {
              if (!localStorage.user) {
                setIsOpenModal(!isOpenModal);
              } else {
                logOut();
              }
            }}
          >
            {isAuthorized ? 'Выйти' : 'Войти'}
          </Button>
          <Menu isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} />
        </div>
      </nav>
      {isOpenMenu ? <div className={cl.overlay} onClick={() => setIsOpenMenu(!isOpenMenu)}></div> : ''}
      {isOpenModal ? (
        <div className={cl.overlay} onClick={(e) => closeOverlay(e)}>
          {<Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} setIsAuthorized={setIsAuthorized} />}
        </div>
      ) : (
        ''
      )}
    </header>
  );
};
