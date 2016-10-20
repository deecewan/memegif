import { Map, List, Record } from 'immutable';
import { actions } from '../actions/video';

const initialState = new Map({
  chunks: new List(),
  info: new Map({
    title: '',
    thumbnails: null,
    channel: '',
  }),
});

const Video = new Record({
  id: null, // the ID that identifies this chunk
  gifUrl: null, // the URL that the gif can be retrieved from
  timeStart: null, // the portion of the video where the gif starts
  timeEnd: null, // the portion of the video where the gif ends
});

function addChunk(state, chunk) {
  const video = new Video(chunk);
  const chunks = state.get('chunks').push(video);
  return state.set('chunks', chunks);
}

function updateChunk(state, update) {
  const id = state.findKey(v => v.id === update.id);
  const newVideo = new Video({ id, ...update });
  return state.set(id, newVideo);
}

function removeChunk(state, id) {
  return state.delete(id);
}

function clearChunks() {
  return initialState;
}

function addInfo(state, info) {
  return state.set('info', new Map({
    title: info.title,
    thumbnails: info.thumbnails,
    channel: info.channelTitle,
  }));
}

function removeInfo(state) {
  return state.set('info', initialState.get('info'));
}


export default function (state = initialState, action) {
  switch (action.type) {
    case actions.ADD:
      return addChunk(state, action.value);
    case actions.UPDATE:
      return updateChunk(state, action.value);
    case actions.REMOVE:
      return removeChunk(state, action.value);
    case actions.CLEAR:
      return clearChunks();
    case actions.ADD_INFO:
      return addInfo(state, action.value);
    case actions.REMOVE_INFO:
      return removeInfo(state);
    default:
      return state;
  }
}
