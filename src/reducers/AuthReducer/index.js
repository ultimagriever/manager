export const AuthReducer = (state = {}, action) => {
  switch (action.type) {
    case 'email_changed':
      return {
          ...state,
          email: action.email
      };
    default:
      return state;
  }
}
