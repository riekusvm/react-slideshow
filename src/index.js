import React from 'react';
import App from './app';
import AppRouter from './router';

React.render((
  <App router={AppRouter}/>
), document.getElementById('content'));
