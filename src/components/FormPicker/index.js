import React from 'react';
import { View, Text, Picker } from 'react-native';
import styles from './styles';

const FormPicker = props => (
    <View style={styles.container}>
      <Text style={styles.label}>
        {props.label}
      </Text>
      <Picker style={styles.input} selectedValue={props.selectedValue} onValueChange={props.onValueChange}>
        {
            props.items.map((item, i) => <Picker.Item key={i} {...item} />)
        }
      </Picker>
    </View>
);

export default FormPicker;
