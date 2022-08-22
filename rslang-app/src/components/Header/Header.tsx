import { HeaderProps } from './Header.props';
import cl from './Header.module.css';
import cn from 'classnames';
import { Menu } from '../Menu/Menu';
import { useRef, useState } from 'react';
import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';
import { Modal } from '../Modal/Modal';

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const closeOverlay = (e: any) => {
    const target = e.target;
    if (target && target.classList.contains('Header_overlay__ijmMg')) {
      setIsOpenModal(!isOpenModal);
    }
  };
  return (
    <header {...props} className={cn(className, cl.header)}>
      <nav className={cl.nav}>
        <Link to='/'>
          <h1 className={cl.logo}>RsLang</h1>
        </Link>

        <div className={cl.wrap}>
          <Button className={cl.login} onClick={() => setIsOpenModal(!isOpenModal)}>
            Войти
          </Button>
          <Menu isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} />
        </div>
      </nav>
      {isOpenMenu ? (
        <div className={cl.overlay} onClick={() => setIsOpenMenu(!isOpenMenu)}></div>
      ) : (
        ''
      )}
      {isOpenModal ? (
        <div className={cl.overlay} onClick={(e) => closeOverlay(e)}>
          {<Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />}
        </div>
      ) : (
        ''
      )}
    </header>
  );
};
