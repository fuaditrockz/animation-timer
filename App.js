import React from 'react';
import {
  StatusBar,
} from 'react-native';

import BackupView from './components/Backup';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <BackupView />
    </>
  );
};

export default App;
