import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from '../containers/LoginForm';
import EmployeeList from '../containers/EmployeeList';
import EmployeeCreate from '../containers/EmployeeCreate';

const RouterComponent = () => (
    <Router sceneStyle={{ paddingTop: 65 }} >
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
        />
        <Scene key="employeeCreate" component={EmployeeCreate} title="Create new Employee" />
      </Scene>
    </Router>
);

export default RouterComponent;
