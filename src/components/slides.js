import React from 'react';
import {Link} from 'react-router';
import Slide from './slide';
import SlideEditor from './slideeditor';
import * as constants from '../constants';

export default class Slides extends React.Component {

  propTypes = {
    slideId: React.PropTypes.number,
    totalSlides: React.PropTypes.number,
    slideText: React.PropTypes.string,
    deleteSlide: React.PropTypes.func,
    saveSlide: React.PropTypes.func,
    addSlide: React.PropTypes.func,
    isEditMode: React.PropTypes.bool
  }

  render = () => {
    window.document.title = constants.APP_TITLE + ' (' + this.props.slideId + ' / '
    + this.props.totalSlides + ')';

    let slide;
    let editButton;

    let baseUrl = (this.props.isEditMode) ? '/edit' : '/slideshow';
    let previousButton;
    let nextButton;
    let navigation = [];

    if (this.props.isEditMode !== true) {
      [...Array(this.props.totalSlides)].map((x, i) => {
        navigation.push(<Link to={baseUrl + '/slide/' + (i + 1)} key={i + 1}>{i + 1} </Link>);
      }
      );

      if (this.props.slideId > 1) {
        previousButton = (<Link to={baseUrl + '/slide/' + (this.props.slideId - 1)}
        ref="previousButton">previous</Link>);
      }
      if (this.props.slideId < this.props.totalSlides) {
        nextButton = (<Link to={baseUrl + '/slide/' + (this.props.slideId + 1)}
        ref="nextButton">next</Link>);
      }
    }

    if (this.props.isEditMode !== true) {
      slide = <Slide data={this.props.slideText} key={this.props.slideId} />;
      editButton = <Link to={'/edit/slide/' + this.props.slideId} ref="editButton">edit</Link>;
    } else {
      slide = (<SlideEditor value={this.props.slideText} index={this.props.slideId}
        onDelete={this.props.deleteSlide} onChange={this.props.saveSlide} ref="editor" />);
    }

    return (
      <div>
        <Link to={baseUrl + '/slide/' + (this.props.totalSlides + 1)} onClick={this.props.addSlide}
          ref="addButton">Add</Link>
        {editButton}
        {slide}
        {previousButton} {navigation} {nextButton}
      </div>
    );
  }
}
