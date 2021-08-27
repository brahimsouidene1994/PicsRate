/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import Routes from './component/Routes';


import {CredentialsProvider} from './context/credentialsContext';
const App = () => {
  return (
    <CredentialsProvider>
      <Routes />
    </CredentialsProvider>
  );
};

export default App;
