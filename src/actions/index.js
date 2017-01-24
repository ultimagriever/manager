import firebase from 'firebase';

export const emailChanged = email => ({
    type: 'email_changed',
    email
});

export const passwordChanged = password => ({
    type: 'password_changed',
    password
});

export const userLoggedIn = user => ({
    type: 'login_user_success',
    user
});

export const userFailedToLogIn = error => ({
    type: 'login_user_failed',
    error
});

export const loadingRequest = loading => ({
    type: 'loading',
    loading
});

const loadingSuccessful = (dispatch, user) => {
    dispatch(userLoggedIn(user));
    dispatch(loadingRequest(false));
};

const loadingFailed = (dispatch, error) => {
    dispatch(userFailedToLogIn(error));
    dispatch(loadingRequest(false));
}

export const loginUser = ({ email, password }) => dispatch => {
    dispatch(loadingRequest(true));
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => loadingSuccessful(dispatch, user))
        .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(user => loadingSuccessful(dispatch, user))
                .catch(error => {
                    let errorMessage;
                    switch (error.code) {
                        case 'auth/app-deleted':
                            errorMessage = 'The authentication server seems to have been deleted.';
                            break;
                        case 'auth/app-not-authorized':
                            errorMessage = 'There\'s an issue with the authentication server domain.';
                            break;
                        case 'auth/argument-error':
                            errorMessage = 'There is a bug with this app, please report it to the developer.';
                            break;
                        case 'auth/invalid-api-key':
                            errorMessage = 'The authentications server didn\'t recognize the API key.';
                            break;
                        case 'auth/network-request-failed':
                            errorMessage = 'Couldn\'t connect to the authentication server,' +
                                ' please check if your device is connected to the Internet.';
                            break;
                        case 'auth/operation-not-allowed':
                            errorMessage = 'The authentication server administrator has not enabled this feature.';
                            break;
                        case 'auth/too-many-requests':
                            errorMessage = 'You have tried too many times, please wait before trying again.';
                            break;
                        case 'auth/user-disabled':
                            errorMessage = 'This user has been disabled from the system.' +
                                ' Please contact an administrator.';
                            break;
                        default:
                            errorMessage = 'Authentication failed.';
                    }

                    loadingFailed(dispatch, errorMessage);
                });
        });
};
