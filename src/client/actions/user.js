import { closeLoginModal } from './settings';

export const actions = {
  LOGIN: 'USER_LOGIN',
  LOGOUT: 'USER_LOGOUT',
};

export function userLogin(user) {
  return {
    type: actions.LOGIN,
    value: user,
  };
}

function userLogout() {
  return {
    type: actions.LOGOUT,
  };
}

export function doLogin({ email, password }) {
  return dispatch => {
    // do the login
    fetch('/auth/login', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ email, password }),
      credentials: 'same-origin',
      mode: 'cors',
    }).then(res => {
      if (!res.ok) {
        return alert('Error logging in!');
      }
      return res.json();
    }).then(json => {
      if (!json) {
        return null;
      }
      // contains the
      dispatch(closeLoginModal());
      return dispatch(userLogin(json));
    });
  };
}

export function doLogout() {
  return dispatch => {
    // do the logout
    fetch('/auth/logout', {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'cors',
    }).then(res => {
      if (!res.ok) {
        return alert('Error logging out!');
      }
      return dispatch(userLogout());
    });
  };
}
