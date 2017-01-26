import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { employeeEdit, employeeUpdate, employeeDelete } from '../../actions';
import EmployeeForm from '../EmployeeForm';
import { Card, CardSection, Button } from '../../components';

class EmployeeEdit extends Component {
  componentWillMount() {
    _.each(this.props.employee, (value, prop) => {
      this.props.onLoad({ prop, value });
    });
  }

  onButtonPress() {
    const { name, phone, shift, id } = this.props;

    this.props.onSubmit({ name, phone, shift, id });
  }

  onDeleteButtonPress() {
    const { id } = this.props;

    this.props.onDelete(id);
  }

  render() {
    return (
        <Card>
          <EmployeeForm {...this.props} />

          <CardSection>
            <Button onPress={this.onButtonPress.bind(this)}>
              Save Changes
            </Button>
          </CardSection>
          <CardSection>
            <Button onPress={this.onDeleteButtonPress.bind(this)}>
              Delete Employee
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
  onSubmit: employee => dispatch(employeeEdit(employee)),
  onLoad: employee => dispatch(employeeUpdate(employee)),
  onDelete: id => dispatch(employeeDelete(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeEdit);
