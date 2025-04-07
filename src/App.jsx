import React from 'react';
import Detection from './Detection';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Link Security Scanner</h1>
          <p>Check the safety of any URL in real-time</p>
        </div>
      </header>
      
      <main className="main-content">
        <Detection />
      </main>

      <footer className="app-footer">
        <p>Powered by Google Safe Browsing API</p>
        <p>© 2024 Link Security Scanner. All rights reserved.</p>
        <p>© created by pratyush chowdhury</p>
      </footer>
    </div>
  );
};

export default App;