import React, { Component } from 'react';
import {
  StatusBar,
} from 'react-native';
import Countdown from './src/components/Countdown';

class App extends Component {
  render() {
    return (
      <>
        <StatusBar backgroundColor="#4a4a4a" barStyle="light-content" />
        <Countdown remainingSecond={189} />
      </>
    );
  }
}

export default App;
