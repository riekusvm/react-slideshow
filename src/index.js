import ReactDOM from 'react-dom';
import React from 'react';
import App from './app';
import AppRouter from './router';

ReactDOM.render((
  <App router={AppRouter} />
), document.getElementById('content'));
