/* eslint-env browser */
/* eslint-global socket */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import MaterialThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import io from 'socket.io-client/socket.io';

import App from './components/App';
import store from './store';
import * as video from './actions/video';

injectTapEventPlugin();

// initialise sockets
window.socket = io();

window.socket.on('chunk_received', data => {
  store.dispatch(video.addChunk(data));
});

render(
  <Provider store={store}>
    <MaterialThemeProvider>
      <App />
    </MaterialThemeProvider>
  </Provider>,
  document.getElementById('app')
);
