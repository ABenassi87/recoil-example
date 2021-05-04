import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import HomeRedux from './redux/pages/Home';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <div className='App'>
            <Home />
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
