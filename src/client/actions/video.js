export const actions = {
  ADD_INFO: 'VIDEO_ADD_INFO',
  REMOVE_INFO: 'VIDEO_REMOVE_INFO',
  ADD: 'VIDEO_ADD_CHUNK',
  REMOVE: 'VIDEO_REMOVE_CHUNK',
  UPDATE: 'VIDEO_UPDATE_CHUNK',
  CLEAR: 'VIDEO_CLEAR_CHUNKS',
};

export function addChunk(value) {
  return {
    value,
    type: actions.ADD,
  };
}

export function removeChunk(id) {
  return {
    type: actions.REMOVE,
    value: id,
  };
}

export function updateChunk(value) {
  return {
    value,
    type: actions.UPDATE,
  };
}

export function clearChunks() {
  return {
    type: actions.CLEAR,
  };
}

export function addInfo(value) {
  return {
    value,
    type: actions.ADD_INFO,
  };
}

export function removeInfo() {
  return {
    type: actions.REMOVE_INFO,
  };
}
