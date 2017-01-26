import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from '../';
import styles from './styles';

export default class ListItem extends Component {
  onRowPress() {
    Actions.employeeEdit({ employee: this.props.employee });
  }

  render() {
    return (
        <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
          <View>
            <CardSection>
              <Image source={{ uri: this.props.employee.avatar }} style={{ width: 200, height: 200, alignSelf: 'center' }} />
            </CardSection>
            <CardSection>
              <Text style={styles.title}>{this.props.employee.name}</Text>
            </CardSection>
          </View>
        </TouchableWithoutFeedback>
    );
  }
}
