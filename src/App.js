import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Chat from './pages/Chat';
import Home from './pages/Home';
import FQA from './pages/FQA';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
          <Route path="/FQA" element={<FQA />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
