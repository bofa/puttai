import React from 'react';
import { init, resize, createPlayer, getPlayers } from '../services/putt';
import AI from '../ai.js';

export default class IndexPage extends React.Component {

  componentWillMount() {
    const { } = this.props;
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    init(window.innerWidth - 256 - 30, window.innerHeight - 64 - 20);
    createPlayer('AI', new AI('AI', getPlayers));
    createPlayer('Dummy');
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    const { puttStop } = this.props;
    puttStop();
  }

  handleResize() {
    resize(window.innerWidth - 256 - 30, window.innerHeight - 64 - 20);
  }

  render() {
    const { players } = this.props;

    return (
      <div id="game" style={{ width: '100%', height: '100%' }} />
    );
  }

}
