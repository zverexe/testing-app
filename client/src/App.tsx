import React from 'react';
import KnowledgeSection from './components/KnowledgeSection';

import logoRise360 from './logo-rise-360.svg';
import logoRiseCom from './logo-rise-com.svg';
import './App.scss';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <img src={logoRiseCom} className="App-logo" alt="logo" />
        <h1>Rise Tech Challenge</h1>
        <img src={logoRise360} className="App-logo" alt="logo" />
      </header>
      <section className="app-section">
        <KnowledgeSection />
      </section>
    </div>
  );
}

export default App;
