import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducer from '../../reducers';
import Router from '../../Router';

export default class App extends Component {
  render() {
    const store = createStore(reducer, {}, applyMiddleware(ReduxThunk));
    return (
        <Provider store={store}>
          <View style={{ flex: 1 }}>
            <Router />
          </View>
        </Provider>
    );
  }
}
