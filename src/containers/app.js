import React from 'react';
import Slides from '../components/slides';
import Store from '../store';
import {Link} from 'react-router';
import * as constants from '../constants';

export default class AppContainer extends React.Component {

  static propTypes = {
    slideId: React.PropTypes.number,
    children: React.PropTypes.element,
    params: React.PropTypes.object
  };

  static defaultProps = {
    slideId: 1
  };

  constructor(props) {
    super(props);
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
    this.state.isEditMode = this.isEditMode();
  }

  isEditMode = () => {
    return this.props.location.pathname.indexOf('edit') !== -1;
  }

  render = () => {
    // XXX: not sure whether this is a good practice..
    this.updateState();

    const slideId = this.getSlideId();
    const currentSlide = Store.get(slideId);

    if (this.state.isEditMode === false) {
      window.onkeydown = this.keyListener;
    } else {
      window.onkeydown = this.keyListenerEdit;
    }

    return (
      <div>
        <Link onClick={this.toggleFullscreen} ref="fsButton">Full screen</Link>
        <Slides totalSlides={Store.getSize()} slideId={slideId} slideText={currentSlide.data}
          addSlide={this.addSlide} saveSlide={this.saveSlide} deleteSlide={this.deleteSlide}
          isEditMode={this.state.isEditMode} ref="slides" />
      </div>
    );
  };

/**
 * Store methods
 */

  saveSlide = (data) => {
    Store.saveSlide(this.getSlideId(), data);
  }

  deleteSlide = () => {
    Store.deleteSlide(this.getSlideId());
  }

  addSlide = () => {
    Store.addSlide();
  }

  keyListener = (event) => {
    const code = event.keyCode ? event.keyCode : event.which;
    let location;
    switch (code) {
    case constants.KEY_LEFT:
      if (this.getSlideId() > 1) {
        location = '/slideshow/slide/' + (this.getSlideId() - 1);
        this.props.history.pushState(null, location);
      }
      break;
    case constants.KEY_RIGHT:
      if (this.getSlideId() < Store.getSize()) {
        location = '/slideshow/slide/' + (this.getSlideId() + 1);
        this.props.history.pushState(null, location);
      }
      break;
    case constants.KEY_E:
      location = '/edit/slide/' + this.getSlideId();
      this.props.history.pushState(null, location);
      break;
    case constants.KEY_F:
      React.findDOMNode(this.refs.fsButton).click();
      break;
    case constants.KEY_PLUS_1:
    case constants.KEY_PLUS_2:
      this.addSlide();
      location = '/slideshow/slide/' + (Store.getSize());
      break;
    default:
      break;
    }
    if (location) {
      this.props.history.pushState(null, location);
    }
  }

  toggleFullscreen = () => {
    if (this.state.fullscreen === false) {
      const el = document.body;

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
}
