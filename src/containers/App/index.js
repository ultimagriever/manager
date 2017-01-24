import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducer from '../../reducers';
import LoginForm from '../LoginForm';

export default class App extends Component {
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBOugST2rrBHGopfu3BctKTbAtjWmyukeU',
      authDomain: 'manager-db471.firebaseapp.com',
      databaseURL: 'https://manager-db471.firebaseio.com',
      storageBucket: 'manager-db471.appspot.com',
      messagingSenderId: '26891983870'
    });
  }

  render() {
    const store = createStore(reducer, {}, applyMiddleware(ReduxThunk));
    return (
        <Provider store={store}>
          <View>
            <LoginForm />
          </View>
        </Provider>
    );
  }
}
