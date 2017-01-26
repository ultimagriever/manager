import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardSection, FormField, Button } from '../../components';
import { employeeUpdate } from '../../actions';

class EmployeeCreate extends Component {
  render() {
    console.log(this.props);
    return (
        <Card>
          <CardSection>
            <FormField
                label="Name"
                placeholder="Jane Doe"
                onChangeText={text => this.props.onChangeText({ prop: 'name', value: text })}
                value={this.props.name}
            />
          </CardSection>

          <CardSection>
            <FormField
                label="Phone"
                placeholder="555-5555"
                onChangeText={text => this.props.onChangeText({ prop: 'phone', value: text })}
                value={this.props.phone}
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

const mapStateToProps = state => state.employee;

const mapDispatchToProps = dispatch => ({
  onChangeText: employee => dispatch(employeeUpdate(employee))
})

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeCreate);
