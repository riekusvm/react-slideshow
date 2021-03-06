import React from 'react';
import ReactDOM from 'react-dom';
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
    let deleteButton;
    if (this.props.index > 1) {
      deleteButton = (<Link to={'/slideshow/slide/' + (this.props.index - 1)}
      onClick={this.props.onDelete} className={css.deleteButton + ' fa fa-trash'} />);
    }
    return (
      <div className={css.slideEditor}>
      <textarea className={css.textArea} defaultValue={this.props.value} ref="data"
        onChange={this.handleChange}></textarea>
      <Link to={'/slideshow/slide/' + this.props.index} ref="doneButton"
        onClick={this.done} className={css.doneButton + ' fa fa-check'} />
      {deleteButton}
     </div>
    );
  }

  done = () => {
    this.props.onChange.apply(this, [this.value]);
  }

  handleChange = () => {
    const val = ReactDOM.findDOMNode(this.refs.data).value.trim();
    this.value = val;
  }
}
