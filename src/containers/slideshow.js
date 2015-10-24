import React from 'react';
import Slides from '../components/slides/slides';
import Store from '../store/store';
import {Link} from 'react-router';
import * as constants from '../constants';
import css from './slideshow.css';

export default class Slideshow extends React.Component {

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
    return this.props.params.mode === 'edit';
  }

  render = () => {
    this.updateState();

    let slideId = this.getSlideId();
    let currentSlide = Store.get(slideId);

    window.onkeydown = (this.state.isEditMode) ? null : this.keyListener;

    return (
      <div>
        <Link to="/fullscreen" onClick={this.toggleFullscreen} ref="fsButton"
          className={css.fullscreen + ' fa fa-arrows-alt'} title="full screen (F)"/>
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
      this.gotoURL(location);
    }
  }

  gotoURL = (url) => {
    this.props.history.pushState(null, url);
  }

  toggleFullscreen = () => {
    if (this.state.fullscreen === false) {
      this.enterFullscreen();
    } else {
      this.exitFullscreen();
    }
    this.state.fullscreen = !this.state.fullscreen;
  }

  enterFullscreen = () => {
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
  }

  exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozExitFullscreen) {
      document.mozExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}
