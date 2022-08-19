import { Route, Routes } from 'react-router-dom';
import { Body } from '../../components/Body/Body';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { AboutPage } from '../AboutPage/AboutPage';
import cl from './MainPage.module.css';

export const MainPage = ( ): JSX.Element => {
    return (
      <div className={cl.wrapper}>
        <Header className={cl.header}></Header>
        <Routes>
          <Route path='/' element={<Body className={cl.main}></Body>} />
          <Route path='/about' element={<AboutPage />} />
          {/* <Route path='/team' element={<TeamPage />} /> */}
        </Routes>

        <Footer className={cl.footer}></Footer>
      </div>
    );
};
