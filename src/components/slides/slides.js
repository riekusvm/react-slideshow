import React from 'react';
import DocumentMeta from 'react-document-meta';
import {Link} from 'react-router';
import Slide from '../slide/slide';
import SlideEditor from '../slideeditor/slideeditor';
import * as constants from '../../constants';
import css from './slides.css';

export default class Slides extends React.Component {

  baseUrl = '';

  static propTypes = {
    slideId: React.PropTypes.number,
    totalSlides: React.PropTypes.number,
    slideText: React.PropTypes.string,
    deleteSlide: React.PropTypes.func,
    saveSlide: React.PropTypes.func,
    addSlide: React.PropTypes.func,
    isEditMode: React.PropTypes.bool
  }

  render = () => {
    this.baseUrl = (this.props.isEditMode) ? '/edit' : '/slideshow';

    let documentTitle = constants.APP_TITLE + ' (' + this.props.slideId + ' / '
    + this.props.totalSlides + ')';

    let slide;
    let editButton;
    let addButton;
    let previousButton;
    let nextButton;
    let navigation;

    if (this.props.isEditMode !== true) {
      navigation = this.getNavigation();
      previousButton = this.getPreviousButton();
      nextButton = this.getNextButton();
      addButton = this.getAddButton();
      slide = <Slide data={this.props.slideText} key={this.props.slideId} />;
      editButton = (<Link to={'/edit/slide/' + this.props.slideId}
        ref="editButton" title="edit (E)" className={css.editButton + ' fa fa-edit'} />);
    } else {
      slide = (<SlideEditor value={this.props.slideText} index={this.props.slideId}
        onDelete={this.props.deleteSlide} onChange={this.props.saveSlide} ref="editor" />);
    }

    return (
      <div className={css.slides}>
        <DocumentMeta title={documentTitle} />
          {slide || ''}
          <div className={css.nav}>
            {previousButton} {navigation} {nextButton}
            {addButton}
            {editButton}
          </div>
      </div>
    );
  }

  getAddButton = () => {
    return (
      <Link to={this.baseUrl + '/slide/' + (this.props.totalSlides + 1)}
        onClick={this.props.addSlide} title="add (+)" ref="addButton"
        className={css.addButton + ' fa fa-plus'} />
    );
  }

  getPreviousButton = () => {
    if (this.props.slideId > 1) {
      let previousButton = (<Link to={this.baseUrl + '/slide/' + (this.props.slideId - 1)}
      ref="previousButton" title="previous (<)"
      className={css.previousButton + ' fa fa-chevron-left'} />);
      return previousButton;
    }
    return '';
  }

  getNextButton = () => {
    if (this.props.slideId < this.props.totalSlides) {
      let nextButton = (<Link to={this.baseUrl + '/slide/' + (this.props.slideId + 1)}
      ref="nextButton" title="next (>)"
      className={css.nextButton + ' fa fa-chevron-right'} />);
      return nextButton;
    }
    return '';
  }

  getNavigation = () => {
    let returnValue = [];
    [...Array(this.props.totalSlides)].map((x, i) => {
      let style = (i === this.props.slideId - 1) ? 'circle' : 'circle-thin';
      let active = (i === this.props.slideId - 1) ? css.active : '';

      returnValue.push(
        <Link to={this.baseUrl + '/slide/' + (i + 1)} key={i + 1}
          className={css.slidenumber + ' ' + active + ' fa fa-' + style}/>
      );
    }
    );
    return returnValue;
  }
}
