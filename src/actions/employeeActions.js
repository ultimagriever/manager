import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export const employeeUpdate = ({ prop, value }) => ({
  type: 'employee_update',
  payload: { prop, value }
});

export const employeeCreate = () => ({
  type: 'employee_create'
});

export const employeeAdd = ({ name, phone, shift }) => dispatch => {
  const { currentUser } = firebase.auth();

  firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .push({ name, phone, shift })
      .then(() => {
        dispatch(employeeCreate());
        Actions.employeeList({ type: 'reset' });
      });
};

export const employeesFetch = () => dispatch => {
  const { currentUser } = firebase.auth();

  firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .on('value', snapshot => dispatch({ type: 'employees_fetch_success', employees: snapshot.val() }));
}
