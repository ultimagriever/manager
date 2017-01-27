import initialState from './initialState.json';

export const EmployeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'employees_fetch_success':
      return {
          ...state,
          employees: action.employees,
          loadingEmployees: false
      };
    case 'employees_loading':
      return {
          ...state,
          loadingEmployees: true
      }
    default:
      return state;
  }
}
