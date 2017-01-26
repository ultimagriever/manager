import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardSection, FormField, FormPicker, Button } from '../../components';
import { employeeUpdate } from '../../actions';
import shifts from './shifts.json';

class EmployeeCreate extends Component {
  render() {
    console.log(this.props);
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
                selectedValue={this.props.shift}
                items={shifts}
            />
          </CardSection>

          <CardSection>
            <Button>
              Create
            </Button>
          </CardSection>
        </Card>
    );
  }
}

const mapStateToProps = state => state.employeeForm;

const mapDispatchToProps = dispatch => ({
  onChangeText: employee => dispatch(employeeUpdate(employee))
})

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeCreate);
