import React from 'react';
import { Text, Modal, View } from 'react-native';
import { CardSection, Button } from '../';
import styles from './styles';

const Confirm = props => (
    <Modal
        visible={props.visible}
        transparent
        animationType="slide"
        onRequestClose={() => {}}
    >
      <View style={styles.container}>
        <CardSection style={styles.cardSection}>
          <Text style={styles.text}>{props.children}</Text>
        </CardSection>

        <CardSection>
          <Button onPress={props.onConfirm}>Yes</Button>
          <Button onPress={props.onCancel}>No</Button>
        </CardSection>
      </View>
    </Modal>
);

export default Confirm;
