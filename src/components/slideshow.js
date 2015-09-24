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

  static contextTypes = {
    router: React.PropTypes.func,
    aString: React.PropTypes.string
  }

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
        <div onClick={this.createSlide}>add one</div>
        <Slide data={Store.get(this.getSlideId())} key={this.getSlideId()} />
      </div>
    );
  };

  createSlide = () => {
    let newSlide = Store.addSlide();
    // console.log(this.context.router);
    console.log(newSlide.key + ': ' + newSlide.data);
    // XXX: for now, we don't have the correct instance of the router passed down..
    // this.context.router.transitionTo('/slideshow/slide/' + newSlide.key);
  };
}
