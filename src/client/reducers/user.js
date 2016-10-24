import { Map, List, Record } from 'immutable';
import { actions } from '../actions/user';

const Search = new Record({
  term: '',
  type: '',
  youtubeTitle: '',
});

const initialState = new Map({
  name: null,
});

function loginUser(state, user) {
  // take the name and searches off the user
  const { name, searches } = user;
  const recordSearches = searches.map(search => new Search(search));
  return state.set('name', name).set('searches', new List(recordSearches));
}

function logoutUser() {
  // just return the initial state
  return initialState;
}

function addSearch(state, search) {
  if (state.get('name') === null) {
    return state;
  }
  const newSearch = new Search({
    term: search.videoId,
    type: 'url', // this is all we do right now.
    youtubeTitle: search.title,
  });
  return state.set('searches', state.get('searches').unshift(newSearch));
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.LOGIN:
      return loginUser(state, action.value);
    case actions.LOGOUT:
      return logoutUser();
    case actions.ADD_SEARCH:
      return addSearch(state, action.value);
    default:
      return state;
  }
}
