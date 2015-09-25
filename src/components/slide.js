import React from 'react';

export default class Slide extends React.Component {

  static propTypes = {
    data: React.PropTypes.string
  };

  render = () => {
    return (
      <div>{this.props.data}</div>
    );
  }
}
