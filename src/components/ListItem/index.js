import React, {Component} from 'react';
import { Text } from 'react-native';
import { CardSection } from '../';
import styles from './styles';

export default class ListItem extends Component {
  render() {
    return (
        <CardSection>
          <Text style={styles.title}>{this.props.employee.name}</Text>
        </CardSection>
    );
  }
}
