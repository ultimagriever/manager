import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Communications from 'react-native-communications';
import { employeeEdit, employeeUpdate, employeeDelete } from '../../actions';
import EmployeeForm from '../EmployeeForm';
import { Card, CardSection, Button, Confirm } from '../../components';

class EmployeeEdit extends Component {
  state = {
    modalVisible: false
  }

  componentWillMount() {
    _.each(this.props.employee, (value, prop) => {
      this.props.onLoad({ prop, value });
    });
  }

  onButtonPress() {
    const { name, phone, shift, avatar, id } = this.props;

    this.props.onSubmit({ name, phone, shift, avatar, id });
  }

  onDeleteButtonPress() {
    const { id } = this.props;

    this.props.onDelete(id);
    this.toggleModalVisible();
  }

  onTextButtonPress() {
    const { phone, shift } = this.props;

    // eslint-disable-next-line
    Communications.text(phone, `Your upcoming shift is on ${shift}`);
  }

  toggleModalVisible() {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  }

  confirmButtonDelete() {
    this.toggleModalVisible();
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
            <Button onPress={this.onTextButtonPress.bind(this)}>
              Text Schedule
            </Button>
          </CardSection>

          <CardSection>
            <Button onPress={this.confirmButtonDelete.bind(this)}>
              Fire Employee
            </Button>
          </CardSection>

          <Confirm
              visible={this.state.modalVisible}
              onCancel={this.toggleModalVisible.bind(this)}
              onConfirm={this.onDeleteButtonPress.bind(this)}
          >
            Are you sure you want to fire them?
          </Confirm>
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
