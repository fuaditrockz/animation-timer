import React from 'react';
import {
  StatusBar,
} from 'react-native';
import Countdown from './src/components/Countdown';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar backgroundColor="#fad390" barStyle="light-content" />
      <Countdown remainingSecond={10} />
    </>
  );
};

export default App;
