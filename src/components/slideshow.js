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

  // static contextTypes = {
  //   router: React.PropTypes.func,
  //   aString: React.PropTypes.string
  // }

  constructor(props) {
    super(props);
    // default state
    this.state = {
      isEditMode: false,
      fullscreen: false
    };
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

    window.document.title = constants.APP_TITLE + ' (' + this.getSlideId() + ' / '
    + Store.getSize() + ')';

    let slideId = this.getSlideId();
    let currentSlide = Store.get(slideId);

    if (this.state.isEditMode === false) {
      window.onkeydown = this.keyListener;
    } else {
      window.onkeydown = this.keyListenerEdit;
    }

    let slide;
    let editButton;

    let baseUrl = (this.state.isEditMode) ? '/edit' : '/slideshow';

    if (this.state.isEditMode !== true) {
      slide = <Slide data={currentSlide.data} key={slideId} />;
      editButton = <Link to={'/edit/slide/' + slideId} ref="editButton">edit</Link>;
    } else {
      slide = (<SlideEditor value={currentSlide.data} index={slideId}
        onDelete={this.deleteSlide} onChange={this.saveSlide} ref="editor" />);
    }

    return (
      <div>
        <Link to={baseUrl + '/slide/' + (Store.getSize() + 1)} onClick={this.addSlide}
          ref="addButton">Add</Link>
        <Link onClick={this.toggleFullscreen} ref="fsButton">Full screen</Link>
        {editButton}
        {slide}
        <Link to={baseUrl + '/slide/' + (slideId - 1)}
          ref="previousButton">previous</Link>
        <Link to={baseUrl + '/slide/' + (slideId + 1)} ref="nextButton">next</Link>
      </div>
    );
  };

  saveSlide = (data) => {
    Store.saveSlide(this.getSlideId(), data);
  }

  deleteSlide = () => {
    Store.deleteSlide(this.getSlideId());
  }

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
    case constants.KEY_F:
      React.findDOMNode(this.refs.fsButton).click();
      break;
    case constants.KEY_PLUS_1:
    case constants.KEY_PLUS_2:
      React.findDOMNode(this.refs.addButton).click();
      break;
    default:
      break;
    }
  }

  toggleFullscreen = () => {
    if (this.state.fullscreen === false) {
      let el = document.body;

      if (el.requestFullscreen) {
        el.requestFullscreen();
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
      } else if (el.mozRequestFullScreen) {
        el.mozRequestFullScreen();
      } else if (el.msRequestFullscreen) {
        el.msRequestFullscreen();
      }
      this.state.fullscreen = true;
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozExitFullscreen) {
        document.mozExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      this.state.fullscreen = false;
    }
  }

  addSlide = () => {
    Store.addSlide();
  }
}
