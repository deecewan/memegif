import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import MaterialThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './components/App';
import store from './store';

injectTapEventPlugin();

render(
  <Provider store={store}>
    <MaterialThemeProvider>
      <App />
    </MaterialThemeProvider>
  </Provider>,
  document.getElementById('app')
);
