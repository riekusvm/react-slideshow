import React from 'react';
import {Link} from 'react-router';

class HelloWorld extends React.Component {
  render() {
    return (
      <div>
      <h1>Hello there, {this.props.name}!</h1>
        <div><Link to="/ditbestaatnieteensjoh!">check het uit</Link></div>
        <div><Link to="/notfound">not found</Link></div>
        <div><Link to="/test">test</Link></div>

        {this.props.children || 'Welcome to your Inbox'}

      </div>
    );
  }
}

HelloWorld.propTypes = {
  name: React.PropTypes.string,
  children: React.PropTypes.element
};

export default HelloWorld;
