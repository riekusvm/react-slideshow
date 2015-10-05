import React from 'react';
import DocumentMeta from 'react-document-meta';
import {Link} from 'react-router';
import Slide from '../slide/slide';
import SlideEditor from '../slideeditor/slideeditor';
import * as constants from '../../constants';
import css from './slides.css';

export default class Slides extends React.Component {

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
    const documentTitle = constants.APP_TITLE + ' (' + this.props.slideId + ' / '
    + this.props.totalSlides + ')';

    let slide;
    let editButton;

    let baseUrl = (this.props.isEditMode) ? '/edit' : '/slideshow';
    let previousButton;
    let nextButton;
    let navigation = [];

    if (this.props.isEditMode !== true) {
      [...Array(this.props.totalSlides)].map((x, i) => {
        const style = (i === this.props.slideId - 1) ? 'circle' : 'circle-thin';
        const active = (i === this.props.slideId - 1) ? css.active : '';

        navigation.push(
          <Link to={baseUrl + '/slide/' + (i + 1)} key={i + 1}
            className={css.slidenumber + ' ' + active + ' fa fa-' + style}/>
        );
      }
      );

      if (this.props.slideId > 1) {
        previousButton = (<Link to={baseUrl + '/slide/' + (this.props.slideId - 1)}
        ref="previousButton" title="previous (<)" className="fa fa-chevron-left" />);
      }
      if (this.props.slideId < this.props.totalSlides) {
        nextButton = (<Link to={baseUrl + '/slide/' + (this.props.slideId + 1)}
        ref="nextButton" title="next (>)" className="fa fa-chevron-right" />);
      }
    }

    if (this.props.isEditMode !== true) {
      slide = <Slide data={this.props.slideText} key={this.props.slideId} />;
      editButton = (<Link to={'/edit/slide/' + this.props.slideId}
        ref="editButton" title="edit (E)" className="fa fa-edit"/>);
    } else {
      slide = (<SlideEditor value={this.props.slideText} index={this.props.slideId}
        onDelete={this.props.deleteSlide} onChange={this.props.saveSlide} ref="editor" />);
    }

    return (
      <div className={css.slides}>
        <DocumentMeta title={documentTitle} />
        {slide}
        <div className={css.nav}>
          {previousButton} {navigation} {nextButton}
          <Link to={baseUrl + '/slide/' + (this.props.totalSlides + 1)}
            onClick={this.props.addSlide} title="add (+)" ref="addButton" className="fa fa-plus" />
          {editButton}
        </div>
      </div>
    );
  }
}
