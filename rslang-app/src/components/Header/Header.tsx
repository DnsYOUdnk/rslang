import { HeaderProps } from './Header.props';
import cl from './Header.module.css';
import cn from 'classnames';
import { Menu } from '../Menu/Menu';
import { useState } from 'react';

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
  return (
    <header {...props} className={cn(className, cl.header)}>
      <nav className={cl.nav}>
        <h1 className={cl.logo}>RsLang</h1>

        <div className={cl.wrap}>
          <button className={cl.log}>Войти</button>
          <Menu isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu} />
        </div>
      </nav>
      {isOpenMenu? <div className={cl.overlay}></div>: ''}
      
    </header>
  );
};