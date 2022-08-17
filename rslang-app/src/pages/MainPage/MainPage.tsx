import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import cl from './MainPage.module.css';

export const MainPage = ( ): JSX.Element => {
    return (
      <div className={cl.wrapper}>
        <Header className={cl.header}></Header>
        <div className={cl.body}>Body</div>
        <Footer className={cl.footer}></Footer>
      </div>
    );
};
