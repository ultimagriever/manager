import React, {Component} from 'react';
import {View, Text} from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import firebase from 'firebase';
import reducer from '../../reducers';
import LoginForm from '../LoginForm';
import { Header } from '../../components';

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
    return (
        <Provider store={createStore(reducer)}>
          <View>
            <Header headerText="Employee Manager" />
            <LoginForm />
          </View>
        </Provider>
    );
  }
}
