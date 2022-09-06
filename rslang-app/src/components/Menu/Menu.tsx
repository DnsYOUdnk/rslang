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
  const menuLinks = [
    { link: '/', text: 'Главная', id: 0 },
    { link: '/textbook', text: 'Учебник', id: 1 },
    { link: '/games', text: 'Мини-Игры', id: 2 },
    { link: '/statistic', text: 'Статистика', id: 3 },
    { link: '/team', text: 'O команде', id: 4 },
  ];
  return (
    <>
      <div
        className={cn(cl.hamburger, {
          [cl.hamburger__active]: isOpenMenu == true,
        })}
        onClick={() => setIsOpenMenu((prev) => !prev)}
      >
        <span></span>
        <span className={cl.long}></span>
        <span></span>
      </div>

      {isOpenMenu ? (
        <>
          <ul className={cl.menu}>
            {menuLinks.map((item) => {
              return (
                <li key={item.id}>
                  <Link
                    to={item.link}
                    className={cl.link}
                    onClick={() => setIsOpenMenu((prev) => !prev)}
                  >
                    {item.text}
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        ''
      )}
    </>
  );
};
