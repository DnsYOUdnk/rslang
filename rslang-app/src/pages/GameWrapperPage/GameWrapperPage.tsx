import cl from './GameWrapperPage.module.css';
import cn from 'classnames';
import { GameWrapperPageProps } from './GameWrapperPage.props';
import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header/Header';

export const GameWrapperPage = ({ children, className, ...props }: GameWrapperPageProps): JSX.Element => {

  return (
    <>
      <main className={cn(className, cl.main)}>
        <div className={cl.games}>
          { children }
        </div>
      </main>
    </>
  )
}