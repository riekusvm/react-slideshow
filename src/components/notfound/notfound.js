import React from 'react';
import css from './notfound.css';

class NotFound extends React.Component {
  render = () => {
    return (
      <div className={css.notfound}>
        <h1>404 not found</h1>
      </div>
    );
  }
}

export default NotFound;
