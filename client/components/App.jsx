import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Radium, { Style } from 'radium';

import UrlBar from './UrlBar';
import VideoInfo from './VideoInfo';

const styles = {
  global: {
    reset: {
      '*': {
        margin: 0,
        boxSizing: 'border-box',
        fontFamily: 'Roboto, sans-serif',
      },
    },
  },
  container: {
    width: '80%',
    marginLeft: '10%',
  },
};

const App = props => (
  <div>
    <Style rules={styles.global.reset} />
    <AppBar
      title="MemeGif"
      iconClassNameRight="muidocs-icon-navigation-expand-more"
    />
    <div className="container" style={styles.container}>
      <UrlBar {...props} />
      <VideoInfo {...props} />
    </div>
  </div>
);

App.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    url: state.getIn(['url']),
    videoInfo: state.getIn(['video', 'info']),
  };
}

export default connect(mapStateToProps)(new Radium(App));
