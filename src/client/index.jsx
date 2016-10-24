/* eslint-env browser */
/* eslint-global socket */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import MaterialThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import io from 'socket.io-client/socket.io';

import App from './components/App';
import store from './store';
import * as video from './actions/video';

import './styles/index.pcss';

injectTapEventPlugin();

// initialise sockets
window.socket = io();

window.socket.on('chunk_received', data => {
  store.dispatch(video.addChunk(data));
});

render(
  <Provider store={store}>
    <MaterialThemeProvider>
      <AppContainer>
        <App />
      </AppContainer>
    </MaterialThemeProvider>
  </Provider>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const App = require('./components/App').default; // eslint-disable-line

    render(
      <Provider store={store}>
        <MaterialThemeProvider>
          <AppContainer>
            <App />
          </AppContainer>
        </MaterialThemeProvider>
      </Provider>,
      document.getElementById('app')
    );
  });
}
