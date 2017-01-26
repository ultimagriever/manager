import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardSection, FormField, FormPicker, Button } from '../../components';
import { employeeUpdate, employeeAdd } from '../../actions';
import shifts from './shifts.json';

class EmployeeCreate extends Component {
  onButtonPress() {
    const { name, phone, shift } = this.props;

    this.props.onSubmit({ name, phone, shift });
  }

  render() {
    return (
        <Card>
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

          <CardSection>
            <Button onPress={this.onButtonPress.bind(this)}>
              Create
            </Button>
          </CardSection>
        </Card>
    );
  }
}

const mapStateToProps = state => ({
  ...state.employeeForm
});

const mapDispatchToProps = dispatch => ({
  onChangeText: employee => dispatch(employeeUpdate(employee)),
  onSubmit: employee => dispatch(employeeAdd(employee))
})

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeCreate);
