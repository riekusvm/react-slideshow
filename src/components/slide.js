import React from 'react';
import Markdown from 'markdown-it';
import emoji from 'markdown-it-emoji';

export default class Slide extends React.Component {

  static propTypes = {
    data: React.PropTypes.string
  };

  render = () => {
    return (
      <div>AAAA
        <div dangerouslySetInnerHTML={this.markUp(this.props.data)} />
      </div>
    );
  }

  markUp = (text) => {
    const md = new Markdown();
    md.use(emoji);
    const markedUp = md.render(text);
    return {__html: markedUp};
  }
}
