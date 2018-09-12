import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './routes/index';
import registerServiceWorker from './registerServiceWorker';

const root = document.getElementById('root');

if (root !== null) {
  ReactDOM.render(<App />, root);
  registerServiceWorker();
}
