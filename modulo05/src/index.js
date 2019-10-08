import React from 'react';
import { StatusBar } from 'react-native';

import './config/ReactotronConfig';

import Routes from './routes';

console.disableYellowBox = true;

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c2" />
      <Routes />
    </>
  );
}
