import React from 'react';
import Store from '../store';
import {Link} from 'react-router';
import * as constants from '../constants';

export default class SlideEditor extends React.Component {

  static propTypes = {
    value: React.PropTypes.string,
    index: React.PropTypes.number,
    onDelete: React.PropTypes.func,
    onChange: React.PropTypes.func
  };

  value = '';

  render = () => {
    return (
      <div>
        <div>
          <textarea defaultValue={this.props.value} ref="data"
            onChange={this.handleChange}></textarea>
        </div>
      <Link to={'/slideshow/slide/' + this.props.index} ref="doneButton"
        onClick={this.done}>Done</Link>
      <Link to={'/slideshow/slide/' + (this.props.index - 1)}
      onClick={this.props.onDelete}>Delete</Link>
     </div>
    );
  }

  done = () => {
    this.props.onChange.apply(this, [this.value]);
  }

  handleChange = () => {
    let val = React.findDOMNode(this.refs.data).value.trim();
    this.value = val;
  }
}
