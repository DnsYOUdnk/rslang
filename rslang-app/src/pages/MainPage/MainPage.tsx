import { Body } from '../../components/Body/Body';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import cl from './MainPage.module.css';

export const MainPage = ( ): JSX.Element => {
    return (
      <div className={cl.wrapper}>
        <Header className={cl.header}></Header>
        <Body className={cl.main}></Body>
        <Footer className={cl.footer}></Footer>
      </div>
    );
};
