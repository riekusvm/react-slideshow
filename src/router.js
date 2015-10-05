import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import Slideshow from './containers/slideshow';
import NotFound from './components/notfound/notfound';

export default class AppRouter extends React.Component {
  render = () => {
    return (
      <Router>
        <Route path="/">
          <Route path="/:mode" component={Slideshow}>
            <Route path="slide/:slideId"/>
          </Route>
          <IndexRoute component={Slideshow} />
        </Route>
        <Route path="*" component={NotFound} />
      </Router>
    );
  }
}
