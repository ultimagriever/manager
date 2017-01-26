import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { CardSection, FormField, FormPicker } from '../../components';
import { employeeUpdate } from '../../actions';
import shifts from './shifts.json';

class EmployeeForm extends Component {
  render() {
    return (
        <View>
          <CardSection>
            <FormField
                label="Name"
                placeholder="Jane Doe"
                onChangeText={value => this.props.onChangeText({ prop: 'name', value })}
                value={this.props.name}
            />
          </CardSection>

          <CardSection>
            <FormField
                label="Phone"
                placeholder="555-5555"
                onChangeText={value => this.props.onChangeText({ prop: 'phone', value })}
                value={this.props.phone}
            />
          </CardSection>

          <CardSection>
            <FormPicker
                label="Shift"
                onValueChange={value => this.props.onChangeText({ prop: 'shift', value })}
                selectedValue={this.props.shift.length > 0 ? this.props.shift : 'mon'}
                items={shifts}
            />
          </CardSection>
        </View>
    );
  }
}

const mapStateToProps = state => ({
  ...state.employeeForm
});

const mapDispatchToProps = dispatch => ({
  onChangeText: employee => dispatch(employeeUpdate(employee))
})

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeForm);
