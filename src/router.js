import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import App from './containers/app';
import NotFound from './components/notfound';

export default class AppRouter extends React.Component {
  render = () => {
    return (
      <Router>
        <Route path="/">
          <Route path="/:mode" component={App}>
            <Route path="slide/:slideId"/>
          </Route>
          <IndexRoute component={App} />
        </Route>
        <Route path="*" component={NotFound} />
      </Router>
    );
  }
}
