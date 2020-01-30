import React from 'react';
import {
  StatusBar,
} from 'react-native';
import Countdown from './components/Countdown';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar backgroundColor="#7ed6df" barStyle="light-content" />
      <Countdown />
    </>
  );
};

export default App;
