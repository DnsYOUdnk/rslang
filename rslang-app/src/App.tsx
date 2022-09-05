import * as React from 'react';
import { HashRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import { TextBook } from './pages/TextBook/TextBook';


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TextBook />} />
          <Route path="/textbook/*" element={<TextBook />} />
          <Route path="/audiocall" element={<TextBook />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;