import React from 'react';
import css from './notfound.css';
import {TEXT_404} from '../../constants';

export default class NotFound extends React.Component {
  render = () => {
    return (
      <div className={css.notfound}>
        <h1>{TEXT_404}</h1>
      </div>
    );
  }
}
