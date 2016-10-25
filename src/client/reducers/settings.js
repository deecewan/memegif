import { Map } from 'immutable';
import { actions } from '../actions/settings';

const initialState = new Map({
  drawer: false,
  loginModal: false,
});

function openDrawer(state) {
  return state.setIn(['drawer'], true);
}

function closeDrawer(state) {
  return state.setIn(['drawer'], false);
}

function toggleDrawer(state) {
  return state.setIn(['drawer'], !state.getIn(['drawer']));
}

function openLoginModal(state) {
  return state.setIn(['loginModal'], true);
}

function closeLoginModal(state) {
  return state.setIn(['loginModal'], false);
}

function openSignupModal(state) {
  return state.setIn(['signupModal'], true);
}

function closeSignupModal(state) {
  return state.setIn(['signupModal'], false);
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.OPEN_DRAWER:
      return openDrawer(state);
    case actions.CLOSE_DRAWER:
      return closeDrawer(state);
    case actions.TOGGLE_DRAWER:
      return toggleDrawer(state);
    case actions.OPEN_LOGIN_MODAL:
      return openLoginModal(state);
    case actions.CLOSE_LOGIN_MODAL:
      return closeLoginModal(state);
    case actions.OPEN_SIGNUP_MODAL:
      return openSignupModal(state);
    case actions.CLOSE_SIGNUP_MODAL:
      return closeSignupModal(state);
    default:
      return state;
  }
}
