import { combineReducers } from 'redux';
import { AuthReducer } from './AuthReducer';
import { EmployeesReducer } from './EmployeesReducer';

export default combineReducers({
  auth: AuthReducer,
  employee: EmployeesReducer
});
