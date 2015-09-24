import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import Slideshow from './components/slideshow';
import NotFound from './components/notfound';
import App from './app';

export default class AppRouter extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" component={App}>
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
