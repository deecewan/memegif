export const actions = {
  SUBMIT: 'SEARCH_SUBMIT',
  CLEAR: 'SEARCH_CLEAR',
};

export function submitSearch(value) {
  return {
    value,
    type: actions.SUBMIT,
  };
}

export function clearSearch() {
  return {
    type: actions.CLEAR,
  };
}
