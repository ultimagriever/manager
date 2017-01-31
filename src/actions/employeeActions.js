// import firebase from 'firebase';
import Firestack from 'react-native-firestack';
import { Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import uuid from 'uuid';

const firestack = new Firestack();

export const employeeUpdate = ({ prop, value }) => ({
  type: 'employee_update',
  payload: { prop, value }
});

export const employeeReset = () => ({
  type: 'employee_reset'
});

export const employeeAdd = ({ name, phone, shift, avatar }) => dispatch => {
  const { currentUser } = firestack.auth();
  firestack.database().ref(`/users/${currentUser.uid}/employees`)
      .push({ name, phone, shift, avatar })
      .then(() => back(dispatch));
};

export const employeesFetch = () => dispatch => {
  const { currentUser } = firestack.auth();
  if (Platform.OS === 'ios') {
    firestack.database().ref(`/users/${currentUser.uid}/employees`)
        .on('value', snapshot => {
          dispatch({ type: 'employees_fetch_success', employees: snapshot.val() });
        });
  } else {
    firestack.database().ref(`/users/${currentUser.uid}/employees`)
        .once('value', snapshot => {
          dispatch({ type: 'employees_fetch_success', employees: snapshot.val() });
        });
  }
}

export const employeeUploadAvatar = uri => dispatch => {
  const { currentUser } = firestack.auth();
  firestack.storage().ref(`uploads/${currentUser.uid}/avatars/${uuid.v4()}.png`)
      .putFile(uri, { contentType: 'image/png' })
      .then(uploadedFile => dispatch(employeeUpdate({ prop: 'avatar', value: uploadedFile.downloadUrl })));
};

export const employeeEdit = ({ name, phone, shift, avatar, id }) => dispatch => {
  const { currentUser } = firestack.auth();
  firestack.database().ref(`/users/${currentUser.uid}/employees/${id}`)
      .update({ name, phone, shift, avatar })
      .then(() => back(dispatch));
};

export const employeeDelete = id => dispatch => {
  const { currentUser } = firestack.auth();
  firestack.database().ref(`/users/${currentUser.uid}/employees/${id}`).remove()
      .then(() => back(dispatch));
}

const back = dispatch => {
  dispatch(employeeReset());
  if (Platform.OS === 'android') {
    employeesFetch();
  }
  Actions.employeeList({ type: 'reset' });
};
