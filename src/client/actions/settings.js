export const actions = {
  OPEN_DRAWER: 'SETTINGS_OPEN_DRAWER',
  CLOSE_DRAWER: 'SETTINGS_CLOSE_DRAWER',
  TOGGLE_DRAWER: 'SETTINGS_TOGGLE_DRAWER',
  OPEN_LOGIN_MODAL: 'SETTINGS_OPEN_LOGIN_MODAL',
  CLOSE_LOGIN_MODAL: 'SETTINGS_CLOSE_LOGIN_MODAL',
  OPEN_SIGNUP_MODAL: 'SETTINGS_OPEN_SIGNUP_MODAL',
  CLOSE_SIGNUP_MODAL: 'SETTINGS_CLOSE_SIGNUP_MODAL',
};

export function openDrawer() {
  return {
    type: actions.OPEN_DRAWER,
  };
}

export function closeDrawer() {
  return {
    type: actions.CLOSE_DRAWER,
  };
}

export function toggleDrawer() {
  return {
    type: actions.TOGGLE_DRAWER,
  };
}

export function openLoginModal() {
  return {
    type: actions.OPEN_LOGIN_MODAL,
  };
}

export function closeLoginModal() {
  return {
    type: actions.CLOSE_LOGIN_MODAL,
  };
}

export function openSignupModal() {
  return {
    type: actions.OPEN_SIGNUP_MODAL,
  };
}

export function closeSignupModal() {
  return {
    type: actions.CLOSE_SIGNUP_MODAL,
  };
}
