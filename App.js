import React from 'react';
import {
  StatusBar,
} from 'react-native';
import Countdown from './src/components/Countdown';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar backgroundColor="#4a4a4a" barStyle="light-content" />
      <Countdown remainingSecond={63} />
    </>
  );
};

export default App;
