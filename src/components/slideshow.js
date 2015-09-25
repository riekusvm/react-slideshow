import React from 'react';
import Slide from './slide';
import SlideEditor from './slideeditor';
import {Link} from 'react-router';
import Store from '../store';
import * as constants from '../constants';

export default class Slideshow extends React.Component {

  static propTypes = {
    slideId: React.PropTypes.number,
    children: React.PropTypes.element,
    params: React.PropTypes.object
  };

  static defaultProps = {
    slideId: 1
  };

  static contextTypes = {
    router: React.PropTypes.func,
    aString: React.PropTypes.string
  }

  constructor(props) {
    super(props);
    // default state
    this.state = {isEditMode: false};
  }

  getSlideId = () => {
    return (this.props.params.slideId) ?
      parseInt(this.props.params.slideId, 10) : this.props.slideId;
  }

  updateState = () => {
    this.props.slideId = this.getSlideId();
    this.state.isEditMode = this.isEditMode();
  }

  isEditMode = () => {
    return this.props.location.pathname.indexOf('edit') !== -1;
  }

  render = () => {
    // XXX: not sure whether this is a good practice..
    this.updateState();
    let currentSlide = Store.get(this.getSlideId());

    if (this.state.isEditMode === false) {
      window.onkeydown = this.keyListener;
    } else {
      window.onkeydown = this.keyListenerEdit;
    }

    let slide;
    let editButton;

    let baseUrl = (this.state.isEditMode) ? '/edit' : '/slideshow';

    if (this.state.isEditMode !== true) {
      slide = <Slide data={currentSlide.data} key={this.getSlideId()} />;
      editButton = <Link to={'/edit/slide/' + this.getSlideId()} ref="editButton">edit</Link>;
    } else {
      slide = <SlideEditor data={Store.get(this.getSlideId())} key={this.getSlideId()} />;
    }

    return (
      <div>
        <h1>SLIDESHOW {this.getSlideId()}</h1>
        <Link to={'/slideshow/slide/' + (Store.getSize() + 1)} onClick={this.addSlide}
          ref="addButton">Add</Link>
        {editButton}
        {slide}
        <Link to={baseUrl + '/slide/' + (this.getSlideId() - 1)}
          ref="previousButton">previous</Link>
        <Link to={baseUrl + '/slide/' + (this.getSlideId() + 1)} ref="nextButton">next</Link>
      </div>
    );
  };

  keyListener = (event) => {
    let code = event.keyCode ? event.keyCode : event.which;
    switch (code) {
    case constants.KEY_LEFT:
      if (this.getSlideId() > 1) {
        React.findDOMNode(this.refs.previousButton).click();
      }
      break;
    case constants.KEY_RIGHT:
      if (this.getSlideId() < Store.getSize()) {
        React.findDOMNode(this.refs.nextButton).click();
      }
      break;
    case constants.KEY_E:
      React.findDOMNode(this.refs.editButton).click();
      break;
    case constants.KEY_PLUS_1:
    case constants.KEY_PLUS_2:
      React.findDOMNode(this.refs.addButton).click();
      break;
    default:
      break;
    }
  }

  addSlide = () => {
    Store.addSlide();
  }
}
