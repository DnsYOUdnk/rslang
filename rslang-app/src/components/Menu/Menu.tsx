import { MenuProps } from './Menu.props';
import cl from './Menu.module.css';
import cn from 'classnames';
import { Link } from 'react-router-dom';

export const Menu = ({
  isOpenMenu,
  setIsOpenMenu,
  className,
  ...props
}: MenuProps): JSX.Element => {
  return (
    <>
      <div
        className={cn(cl.hamburger, {
          [cl.hamburger__active]: isOpenMenu == true,
        })}
        onClick={() => setIsOpenMenu(!isOpenMenu)}
      >
        <span></span>
        <span className={cl.long}></span>
        <span></span>
      </div>

      {isOpenMenu ? (
        <>
          <ul className={cl.menu}>
            <li>
              <Link to='/' className={cl.link}>
                Главная
              </Link>
            </li>
            <li>
              <Link to='/book' className={cl.link}>
                Учебник
              </Link>
            </li>
            <li>
              <Link to='/games' className={cl.link}>
                Мини-Игры
              </Link>
            </li>
            <li>
              <Link to='/dictionary' className={cl.link}>
                Словарь
              </Link>
            </li>
            <li>
              <Link to='/statistics' className={cl.link}>
                Статистика
              </Link>
            </li>
            <li>
              <Link to='/team' className={cl.link}>
                O команде
              </Link>
            </li>
          </ul>
        </>
      ) : (
        ''
      )}
    </>
  );
};
