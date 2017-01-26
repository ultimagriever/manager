import initialState from './initialState.json';

export const EmployeeFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'employee_update':
      return {
          ...state,
        [action.payload.prop]: action.payload.value
      };
    case 'employee_reset':
      console.log('I am resetting');
      return {
          ...state,
          ...initialState
      }
    default:
      return state;
  }
}
