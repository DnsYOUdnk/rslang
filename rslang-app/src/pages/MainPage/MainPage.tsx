import { Footer } from '../../components/Footer/Footer';
import cl from './MainPage.module.css';

export const MainPage = ( ): JSX.Element => {
    return (
      <div className={cl.wrapper}>
        <div className={cl.header}>Header</div>
        <div className={cl.body}>Body</div>
        <Footer className={cl.footer}></Footer>
      </div>
    );
};
