import React from 'react';
import {Link} from 'react-router';
import css from './slideeditor.css';

export default class SlideEditor extends React.Component {

  static propTypes = {
    value: React.PropTypes.string,
    index: React.PropTypes.number,
    onDelete: React.PropTypes.func,
    onChange: React.PropTypes.func
  };

  value = '';

  componentDidMount = () => {
    this.handleChange();
  }

  render = () => {
    return (
      <div className={css.slideEditor}>
        <div>
          <textarea className={css.textArea} defaultValue={this.props.value} ref="data"
            onChange={this.handleChange}></textarea>
        </div>
      <Link to={'/slideshow/slide/' + this.props.index} ref="doneButton"
        onClick={this.done} className="fa fa-check"/>
      <Link to={'/slideshow/slide/' + (this.props.index - 1)}
      onClick={this.props.onDelete} className="fa fa-trash"/>
     </div>
    );
  }

  done = () => {
    this.props.onChange.apply(this, [this.value]);
  }

  handleChange = () => {
    const val = React.findDOMNode(this.refs.data).value.trim();
    this.value = val;
  }
}
