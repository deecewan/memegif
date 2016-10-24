import axios from 'axios';

import * as videoActions from './video';
import * as userActions from './user';

export const actions = {
  GET_TITLE: 'URL_GET_TITLE',
  SUBMIT: 'URL_SUBMIT',
  CLEAR: 'URL_CLEAR',
};

const youtubeRegex = /https:\/\/(www.)?youtu.?be(.com\/watch\?v=|\/)(.*)/;

export function submitUrl(value) {
  return async dispatch => {
    // get the actual value from the url
    const id = (value.match(youtubeRegex)[3]).split('?')[0]; // drop any query string
    window.socket.emit('register', { videoId: id });
    axios(`/video/${id}`)
      .then(res => {
        dispatch(userActions.userAddSearch(res.data));
        dispatch(videoActions.addInfo(res.data));
      });
    return dispatch({
      value,
      type: actions.SUBMIT,
    });
  };
}

export function clearUrl() {
  return {
    type: actions.CLEAR,
  };
}
