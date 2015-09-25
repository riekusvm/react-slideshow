import React from 'react';
import Slide from './slide';
import SlideEditor from './slideeditor';
import {Link} from 'react-router';
import Store from '../store';

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
    Store.props.slideId = this.props.slideId = this.getSlideId();
    this.state.isEditMode = this.isEditMode();
  }

  isEditMode = () => {
    return this.props.location.pathname.indexOf('edit') !== -1;
  }

  render = () => {
    // XXX: not sure whether this is a good practice..
    this.updateState();
    let navigation = Store.props.slides.map((slide) => {
      return (
        <Link to={'/slideshow/slide/' + slide.key} key={slide.key}>{slide.key}&nbsp;
        </Link>
      );
    });

    let slide;
    let editButton;

    if (this.state.isEditMode !== true) {
      slide = <Slide data={Store.get(this.getSlideId()).data} key={this.getSlideId()} />;
      editButton = <Link to={'/edit/slide/' + this.getSlideId()}>edit</Link>;
    } else {
      slide = <SlideEditor data={Store.get(this.getSlideId())} key={this.getSlideId()} />;
    }

    return (
      <div>
        <h1>SLIDESHOW {this.getSlideId()}</h1>
        {navigation}
        <Link to={'/slideshow/slide/' + (Store.getSize() + 1)} onClick={this.addSlide}>Add</Link>
        {editButton}
        {slide}
      </div>
    );
  };

  addSlide = () => {
    Store.addSlide();
  }
}
