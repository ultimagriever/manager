import initialState from './initialState.json';

export const EmployeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'employees_fetch_success':
      return action.employees;
    default:
      return state;
  }
}
