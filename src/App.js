import React from 'react';
import './App.css';
import logo from './logo.svg';
import Cat from './modules/cat';
import logger from './modules/core/logger';

function App() {
  const [withCat, toggleCat] = React.useState(true);
  const [isLoggerEnabled, updateLogger] = React.useState(logger.isEnabled);

  React.useEffect(() => {
    const loggerEnabledValue = JSON.stringify(isLoggerEnabled);
    if (localStorage.getItem('logger') !== loggerEnabledValue) {
      localStorage.setItem('logger', loggerEnabledValue);
      document.location.reload();
    }
  }, [isLoggerEnabled]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
        <div>
          <label htmlFor="logger">
            <input
              id="logger"
              type="checkbox"
              checked={isLoggerEnabled}
              onChange={event => updateLogger(event.target.checked)}
            />
            logger
          </label>
        </div>
      </header>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
      <div>
        <button onClick={() => toggleCat(!withCat)}>
          {withCat ? 'Hide Cat' : 'Show Cat'}
        </button>
      </div>
      {withCat && <Cat />}
    </div>
  );
}

export default App;
