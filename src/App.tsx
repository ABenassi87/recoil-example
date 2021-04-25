import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot, useRecoilSnapshot } from 'recoil';
import './App.css';
import Home from './pages/Home';

function DebugObserver() {
  const snapshot = useRecoilSnapshot();
  useEffect(() => {
    console.debug('The following atoms were modified:');
    // @ts-ignore
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.debug(node.key, snapshot.getLoadable(node));
    }
  }, [snapshot]);

  return null;
}

function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<div>Loading...</div>}>
        <DebugObserver />
        <Router>
          <div className='App'>
            <Home />
          </div>
        </Router>
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
