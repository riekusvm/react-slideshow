import React from 'react';
import Slide from './slide';
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

  componentDidMount = () => {
    this.props.slideId = this.getSlideId();
    this.props.size = Store.props.slides.length;
  };

  getSlideId = () => {
    return (this.props.params.slideId) ?
      parseInt(this.props.params.slideId, 10) : this.props.slideId;
  }

  componentDidUpdate = () => {
    Store.props.slideId = this.props.slideId = this.getSlideId();
  }

  render = () => {
    let navigation = Store.props.slides.map((slide) => {
      return (
        <Link to={'/slideshow/slide/' + slide.key} key={slide.key}>{slide.key}&nbsp;
        </Link>
      );
    });

    return (
      <div>
        <h1>SLIDESHOW {this.getSlideId()}</h1>
        {navigation}
        <Slide data={Store.get(this.getSlideId())} />
      </div>
    );
  };
}
