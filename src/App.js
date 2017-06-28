import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Game from './reactComponents/Game';

class App extends Component {
  render() {
    return <Game width={70} height={50} />;
  }
}

export default App;
