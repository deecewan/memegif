import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Radium, { Style } from 'radium';
import ImmutableProps from 'react-immutable-proptypes';

import UrlBar from './UrlBar';
import VideoInfo from './VideoInfo';
import VideoChunk from './VideoChunk';

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

function getChunks(chunks) {
  return chunks.map((chunk, i) => <VideoChunk key={i} {...chunk.toJS()} />).toJS();
}

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
      {getChunks(props.chunks)}
    </div>
  </div>
);

App.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
  chunks: ImmutableProps.list,
};

function mapStateToProps(state) {
  return {
    url: state.getIn(['url']),
    videoInfo: state.getIn(['video', 'info']),
    chunks: state.getIn(['video', 'chunks']),
  };
}

export default connect(mapStateToProps)(new Radium(App));
