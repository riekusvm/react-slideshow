import React from 'react';
import css from './app.css';

export default class App extends React.Component {
  render = () => {
    return (
      <div className={css.app}>
          <this.props.router />
          {this.props.children || '' }
      </div>
    );
  }
}
