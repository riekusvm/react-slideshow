import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import Slideshow from './components/slideshow';
import NotFound from './components/notfound';

export default class AppRouter extends React.Component {
  render = () => {
    return (
      <Router>
        <Route path="/">
          <Route path="/slideshow" component={Slideshow}>
            <Route path="slide/:slideId" component={Slideshow} />
          </Route>
          <Route path="/edit" component={Slideshow}>
            <Route path="slide/:slideId" component={Slideshow} />
          </Route>
            <IndexRoute component={Slideshow} />
        </Route>
        <Route path="*" component={NotFound} />
      </Router>
    );
  }
}
