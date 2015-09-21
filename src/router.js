import React from 'react';
import {Router, Route} from 'react-router';
import App from './components/app';
import Slideshow from './components/slideshow';
import Slide from './components/slide';
import NotFound from './components/notfound';

class AppRouter extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" component={App}>
          <Route path="slides" component={Slideshow}>
            <Route path="/slide/:slideId" component={Slide} />
          </Route>
        </Route>
        <Route path="*" component={NotFound} />
      </Router>
    );
  }
}

export default AppRouter;
