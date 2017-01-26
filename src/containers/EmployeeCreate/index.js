import React, { Component } from 'react';
import { connect } from 'react-redux';
import { employeeAdd, employeeReset } from '../../actions';
import EmployeeForm from '../EmployeeForm';
import { Card, CardSection, Button } from '../../components';

class EmployeeCreate extends Component {
  componentWillMount() {
    this.props.onLoad();
  }

  onButtonPress() {
    const { name, phone, shift } = this.props;

    this.props.onSubmit({ name, phone, shift });
  }

  render() {
    return (
        <Card>
          <EmployeeForm {...this.props} />

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
  onSubmit: employee => dispatch(employeeAdd(employee)),
  onLoad: () => dispatch(employeeReset())
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeCreate);
