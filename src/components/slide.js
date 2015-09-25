import React from 'react';
import markdown from 'markdown-it';
import emoji from 'markdown-it-emoji';

export default class Slide extends React.Component {

  static propTypes = {
    data: React.PropTypes.string
  };

  render = () => {
    return (
      <div dangerouslySetInnerHTML={this.markUp(this.props.data)} />
    );
  }

  markUp = (text) => {
    let md = new markdown();
    md.use(emoji);
    let markedUp = md.render(text);
    return {__html: markedUp};
  }
}
