import { Map, List } from 'immutable';
import { actions } from '../actions/search';

const initialState = new Map({
  currentTerm: '',
  previousTerms: new List(),
});

function addSearch(state, term) {
  const current = state.get('currentTerm');
  if (current === '') {
    return state.set('currentTerm', term);
  }
  const prev = state.get('previousTerms').push(current);
  return state.set('currentTerm', term).set('previousTerms', prev);
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.ADD:
      return addSearch(state, action.value);
    default:
      return state;
  }
}
