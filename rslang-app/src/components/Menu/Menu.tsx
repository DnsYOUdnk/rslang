import { MenuProps } from './Menu.props';
import cl from './Menu.module.css';
import cn from 'classnames';

export const Menu = ({ isOpenMenu, setIsOpenMenu, className, ...props }: MenuProps): JSX.Element => {
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
              <a href='#' className={cl.link}>
                Главная
              </a>
            </li>
            <li>
              <a href='#' className={cl.link}>
                Учебник
              </a>
            </li>
            <li>
              <a href='#' className={cl.link}>
                Мини-Игры
              </a>
            </li>
            <li>
              <a href='#' className={cl.link}>
                Словарь
              </a>
            </li>
            <li>
              <a href='#' className={cl.link}>
                Статистика
              </a>
            </li>
            <li>
              <a href='#' className={cl.link}>
                O команде
              </a>
            </li>
          </ul>
        </>
      ) : (
        ''
      )}
    </>
  );
};