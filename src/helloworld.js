import React from 'react';

class HelloWorld extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}!</h1>
    );
  }
}

HelloWorld.propTypes = {
  name: React.PropTypes.string
};

export default HelloWorld;
