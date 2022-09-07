import { HashRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { DATA_GAMES } from './dataGames/dataGames';
import { AboutPage } from './pages/AboutPage/AboutPage';
import { GameAudioCallPage } from './pages/Games/AudioCallPage/GameAudioCallPage';
import { GameSprintPage } from './pages/Games/SprintPage/GameSprintPage';
import { GamesPage } from './pages/GamesPage/GamesPage';
import { GameWrapperPage } from './pages/GameWrapperPage/GameWrapperPage';
import { MainPage } from './pages/MainPage/MainPage';
import { StatisticPage } from './pages/StatisticPage/StatisticPage';
import { TeamPage } from './pages/TeamPage/TeamPage';
import { TextBook } from './pages/TextBook/TextBook';

function App() {

  return (
    <>
      <BrowserRouter>
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
            <Route
              path='/games/sprint'
              element={
                <GameWrapperPage dataGame={DATA_GAMES.sprint}>
                  <GameSprintPage />
                </GameWrapperPage>
              }
            />
            <Route path='/statistic' element={<StatisticPage />} />
            <Route path='/textbook' element={<TextBook />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;