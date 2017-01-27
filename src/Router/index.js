import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Firestack from 'react-native-firestack';
import { connect } from 'react-redux';
import LoginForm from '../containers/LoginForm';
import EmployeeList from '../containers/EmployeeList';
import EmployeeCreate from '../containers/EmployeeCreate';
import EmployeeEdit from '../containers/EmployeeEdit';
import { authenticate, logoutUser } from '../actions';
import { Loading } from '../components';

class RouterComponent extends Component {
  componentWillMount() {
    const firestack = new Firestack();

    firestack.auth().onAuthStateChanged(user => {
      if (user !== null) {
        this.props.isAuthenticated(user);
      } else {
        this.props.logout();
      }
    });
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
        <Router sceneStyle={{ paddingTop: 65 }} >
          <Scene key="loading" component={Loading} title="Loading" initial />
          <Scene key="auth">
            <Scene key="login" component={LoginForm} title="Please login" initial />
          </Scene>
          <Scene key="main">
            <Scene
                key="employeeList"
                component={EmployeeList}
                title="Employees"
                rightTitle="Add"
                onRight={() => Actions.employeeCreate()}
                leftTitle="Logout"
                onLeft={() => this.props.logout()}
                initial
            />
            <Scene key="employeeCreate" component={EmployeeCreate} title="Create new Employee" />
            <Scene key="employeeEdit" component={EmployeeEdit} title="Edit Employee" />
          </Scene>
        </Router>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
});

const mapDispatchToProps = dispatch => ({
  isAuthenticated: user => dispatch(authenticate(user)),
  logout: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(RouterComponent);
