/* eslint-env browser */
/* eslint-global socket */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import MaterialThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './components/App';
import store from './store';

injectTapEventPlugin();

// initial state
store.dispatch({
  type: 'VIDEO_ADD_CHUNK',
  value: {
    id: 1,
    gifUrl: 'http://i.imgur.com/sxc9H2J.mp4',
    timeStart: 0,
    timeEnd: 10,
  },
});

console.log(window.socket);

window.socket.on('chunk', (...args) => {
  store.dispatch({
    type: 'TESTING_SOCKET',
    value: args,
  });
});

render(
  <Provider store={store}>
    <MaterialThemeProvider>
      <App />
    </MaterialThemeProvider>
  </Provider>,
  document.getElementById('app')
);
