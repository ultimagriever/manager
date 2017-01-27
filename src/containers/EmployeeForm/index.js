import React, { Component } from 'react';
import { View, Image, Alert } from 'react-native';
import { connect } from 'react-redux';
import { showImagePicker } from 'react-native-image-picker';
import { CardSection, FormField, FormPicker, Button } from '../../components';
import { employeeUpdate, employeeUploadAvatar } from '../../actions';
import shifts from './shifts.json';

class EmployeeForm extends Component {
  onSelectPicture() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    showImagePicker(options, response => {
      if (response.error) {
        Alert.alert('ImagePicker Error', response.error);
      } else if (typeof response.uri !== 'undefined') {
        this.props.onUpload(response.uri);
      }
    });
  }

  render() {
    return (
        <View>
          <CardSection>
            <FormField
                label="Name"
                placeholder="Jane Doe"
                onChangeText={value => this.props.onChange({ prop: 'name', value })}
                value={this.props.name}
            />
          </CardSection>

          <CardSection>
            <FormField
                label="Phone"
                placeholder="555-5555"
                keyboardType="phone-pad"
                onChangeText={value => this.props.onChange({ prop: 'phone', value })}
                value={this.props.phone}
            />
          </CardSection>

          <CardSection>
            <FormPicker
                label="Shift"
                onValueChange={value => this.props.onChange({ prop: 'shift', value })}
                selectedValue={this.props.shift.length > 0 ? this.props.shift : 'mon'}
                items={shifts}
            />
          </CardSection>

          <CardSection>
            <Image source={{ uri: this.props.avatar }} style={{ width: 50, height: 50, alignSelf: 'center' }} />
            <Button onPress={this.onSelectPicture.bind(this)}>
              Select Profile Picture
            </Button>
          </CardSection>
        </View>
    );
  }
}

const mapStateToProps = state => ({
  ...state.employeeForm
});

const mapDispatchToProps = dispatch => ({
  onChange: employee => dispatch(employeeUpdate(employee)),
  onUpload: uri => dispatch(employeeUploadAvatar(uri))
})

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeForm);
