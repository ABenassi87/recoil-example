import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './App.css';
import Home from './pages/Home';

function App() {
  return (
    <RecoilRoot>
      <Router>
        <div className='App'>
          <Home />
        </div>
      </Router>
    </RecoilRoot>
  );
}

export default App;
