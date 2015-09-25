import React from 'react';

export default class App extends React.Component {

  static propTypes = {
    children: React.PropTypes.element,
    router: React.PropTypes.func
  };

  static childContextTypes = {
    router: React.PropTypes.func,
    aString: React.PropTypes.string
  }

  getChildContext = () => {
    return {
      router: this.props.router,
      aString: 'test 123'
    };
  }

  render = () => {
    return (
      <div>
          <this.props.router />
          {this.props.children || '' }
      </div>
    );
  }
}
