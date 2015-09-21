import React from 'react';
import Slide from './slide';
import {Link} from 'react-router';

class Slideshow extends React.Component {

  constructor() {
    super();
    this.state = {slides: [
      {id: '1', data: 'this is slide #1'},
      {id: '2', data: 'this is slide #2'},
      {id: '3', data: 'this is slide #3'},
      {id: '4', data: 'this is slide #4'}
    ],
    slideId: 0};
  }

  componentDidMount() {
    this.setState({
      // route components are rendered with useful information, like URL params
      slideId: this.props.params.slideId
    });
  }

  render() {
    let slides = this.state.slides.map((slide) => {
      return (<Link to={'/slide/' + slide.id}><Slide data={slide.data} /></Link>);
    });

    return (
      <div>
        <h1>SLIDESHOW {this.state.slideId}</h1>
        {slides}
        {this.props.children || ''}
      </div>
    );
  }
}

Slideshow.propTypes = {
  slides: React.PropTypes.array,
  slideId: React.PropTypes.number,
  params: React.PropTypes.object,
  children: React.PropTypes.element
};
export default Slideshow;
