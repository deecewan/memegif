import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import ImmutableProps from 'react-immutable-proptypes';

import UrlBar from './UrlBar';
import VideoInfo from './VideoInfo';
import VideoChunk from './VideoChunk';

import styles from '../styles/App.pcss';

function getChunks(chunks) {
  return chunks.map((chunk, i) => <VideoChunk key={i} {...chunk.toJS()} />).toJS();
}

function AppComponent(props) {
  return (
    <div>
      <AppBar
        title="MemeGif"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
      <div className={styles.container}>
        <UrlBar {...props} />
        <VideoInfo {...props} />
        {getChunks(props.chunks)}
      </div>
    </div>
  );
}

AppComponent.propTypes = {
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

const App = connect(mapStateToProps)(AppComponent);

export { App as default };
