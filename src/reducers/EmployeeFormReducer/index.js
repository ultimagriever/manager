import initialState from './initialState.json';

export const EmployeeFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'employee_update':
      return {
          ...state,
        [action.payload.prop]: action.payload.value
      };
    default:
      return state;
  }
}
