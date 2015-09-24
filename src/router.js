import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import Slideshow from './components/slideshow';
import NotFound from './components/notfound';

export default class AppRouter extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/">
          <IndexRoute component={Slideshow} />
          <Route path="/slideshow" component={Slideshow}>
            <Route path="slide/:slideId" component={Slideshow} />
          </Route>
        </Route>
        <Route path="*" component={NotFound} />
      </Router>
    );
  }
}
