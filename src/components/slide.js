import React from 'react';

class Slide extends React.Component {
  render() {
    return (
      <div>{this.props.data}</div>
    );
  }
}

Slide.propTypes = {
  data: React.PropTypes.string
};

export default Slide;
