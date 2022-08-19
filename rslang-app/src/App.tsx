import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { AboutPage } from './pages/AboutPage/AboutPage';
import { MainPage } from './pages/MainPage/MainPage';
import { TeamPage } from './pages/TeamPage/TeamPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<MainPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/team' element={<TeamPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
