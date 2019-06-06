import React from 'react';
import './App.css';
import store from './store';
import auth from './store/auth';

const App: React.FC = () => {
  const login = () => {
    store.dispatch(auth.actions.login('test'));
  };

  return (
    <div className="App">
      <button onClick={login}>test</button>
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
