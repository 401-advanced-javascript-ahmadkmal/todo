import React from 'react';
import ReactDOM from 'react-dom';

import App from './app.js';
import 'bootstrap/dist/css/bootstrap.min.css';
function Main() {
    return (
      <React.StrictMode>
      <App />
      </React.StrictMode>
      );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Main />, rootElement);
