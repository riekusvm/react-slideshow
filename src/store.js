import React from 'react';

export default class Store extends React.Component {

  static props = {
    slides: [
      {key: '1', data: 'this is slide #1'},
      {key: '2', data: 'this is slide #2'},
      {key: '3', data: 'this is slide #3'},
      {key: '4', data: 'this is slide #4'}
    ],
    slideId: 1,
    editMode: false
  };

  static get(id) {
    return this.props.slides[id - 1];
  }
}
