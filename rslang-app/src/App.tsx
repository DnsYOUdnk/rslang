import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { DATA_GAMES } from './dataGames/dataGames';
import { AboutPage } from './pages/AboutPage/AboutPage';
import { GameAudioCallPage } from './pages/Games/AudioCallPage/GameAudioCallPage';
import { GamesPage } from './pages/GamesPage/GamesPage';
import { GameWrapperPage } from './pages/GameWrapperPage/GameWrapperPage';
import { MainPage } from './pages/MainPage/MainPage';
import { TeamPage } from './pages/TeamPage/TeamPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<MainPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/team' element={<TeamPage />} />
          <Route path='/games' element={<GamesPage />} />
          <Route
            path='/games/audiocall'
            element={
              <GameWrapperPage dataGame={DATA_GAMES.audiocall}>
                <GameAudioCallPage />
              </GameWrapperPage>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
