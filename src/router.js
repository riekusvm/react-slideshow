import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import AppContainer from './components/appcontainer';
import NotFound from './components/notfound';

export default class AppRouter extends React.Component {
  render = () => {
    return (
      <Router>
        <Route path="/">
          <Route path="/:mode" component={AppContainer}>
            <Route path="slide/:slideId"/>
          </Route>
          <IndexRoute component={AppContainer} />
        </Route>
        <Route path="*" component={NotFound} />
      </Router>
    );
  }
}
