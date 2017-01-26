import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export const employeeUpdate = ({ prop, value }) => ({
  type: 'employee_update',
  payload: { prop, value }
});

export const employeeReset = () => ({
  type: 'employee_reset'
});

export const employeeAdd = ({ name, phone, shift }) => dispatch => {
  const { currentUser } = firebase.auth();

  firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .push({ name, phone, shift })
      .then(() => back(dispatch));
};

export const employeesFetch = () => dispatch => {
  const { currentUser } = firebase.auth();

  firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .on('value', snapshot => dispatch({ type: 'employees_fetch_success', employees: snapshot.val() }));
}

export const employeeEdit = ({ name, phone, shift, id }) => dispatch => {
  const { currentUser } = firebase.auth();

  firebase.database().ref(`/users/${currentUser.uid}/employees/${id}`)
      .update({ name, phone, shift })
      .then(() => back(dispatch));
};

export const employeeDelete = id => dispatch => {
  const { currentUser } = firebase.auth();

  firebase.database().ref(`/users/${currentUser.uid}/employees/${id}`).remove()
      .then(() => back(dispatch));
}

const back = dispatch => {
  dispatch(employeeReset());
  Actions.employeeList({ type: 'reset' });
};
