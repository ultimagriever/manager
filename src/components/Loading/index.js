import React from 'react';
import { View } from 'react-native';
import { Spinner } from '../';
import styles from './styles';

const Loading = () => (
    <View style={styles.container}>
      <Spinner size="large" color="white" />
    </View>
);

export default Loading;
