import React from 'react';
import {Link} from 'react-router';

class App extends React.Component {
  render() {
    return (
      <div>
        <Link to="/slides">slides</Link>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element
};

export default App;
