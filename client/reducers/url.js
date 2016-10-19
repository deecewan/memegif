import { actions } from '../actions/url';

const initialState = '';

function submitUrl(term) {
  return term;
}

function clearUrl() {
  return '';
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.SUBMIT:
      return submitUrl(action.value);
    case actions.CLEAR:
      return clearUrl();
    default:
      return state;
  }
}
