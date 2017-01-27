import initialState from './initialState.json';

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'is_authenticated':
      return {
          ...state,
          authenticated: true,
          user: action.user
      };
    case 'logout':
      return {
          ...state,
          authenticated: false,
          user: null
      };
    case 'email_changed':
      return {
          ...state,
          email: action.email
      };
    case 'password_changed':
      return {
          ...state,
          password: action.password
      };
    case 'login_user_success':
      return {
          ...state,
          ...initialState,
          user: action.user
      };
    case 'login_user_failed':
      return {
          ...state,
          error: action.error,
          password: ''
      };
    case 'loading':
      return {
          ...state,
          loading: action.loading
      };
    default:
      return state;
  }
}
