import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {StyleSheet,StatusBar} from 'react-native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import store from './store';
import Router from './Router';

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <Router />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
