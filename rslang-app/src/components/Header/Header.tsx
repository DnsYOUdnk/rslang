import { HeaderProps } from './Header.props';
import cl from './Header.module.css';
import cn from 'classnames';

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
    return (
      <header {...props} className={cn(className, cl.header)}>
        <div className={cl.header__logo}>RsLang</div>
        <nav className={cl.nav}>
          <ul className={cl.games}>
            <li>
              <div className={cl.title}>Игры</div>
              <a href='#' className={cl.link}>
                Аудиовызов
              </a>
              <a href='#' className={cl.link}>
                Спринт
              </a>
            </li>
            <li>
              <a href='#' className={cl.link}>
                Статистика
              </a>
            </li>
            <li>
              <a href='#' className={cl.link}>
                вход/выход
              </a>
            </li>
          </ul>
        </nav>
      </header>
    );
};