import React from 'react';
import Store from '../store';
import {Link} from 'react-router';

export default class SlideEditor extends React.Component {

  static propTypes = {
    data: React.PropTypes.object
  };

  render = () => {
    return (
      <div>
        <div>
          <textarea defaultValue={this.props.data.data} onChange={this.handleChange}
          ref="data"></textarea>
        </div>
      <Link to={'/slideshow/slide/' + this.props.data.key} >Done</Link>
      <Link to={'/slideshow/slide/' + (this.props.data.key - 1)}
      onClick={this.deleteSlide}>Delete</Link>
     </div>
    );
  }

  deleteSlide = () => {
    Store.deleteSlide(this.props.data.key);
  }

  handleChange = () => {
    let data = React.findDOMNode(this.refs.data).value.trim();
    Store.saveSlide(this.props.data.key, data);
  }
}
