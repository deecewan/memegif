import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ImmutableProps from 'react-immutable-proptypes';

import UrlBar from './UrlBar';
import VideoInfo from './VideoInfo';
import VideoChunk from './VideoChunk';
import Menu from './Menu';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';

// actions we need
import * as settings from '../actions/settings';

import styles from '../styles/App.pcss';

function getChunks(chunks) {
  return chunks.map((chunk, i) => <VideoChunk key={i} {...chunk.toJS()} />).toJS();
}

function AppComponent(props) {
  return (
    <div>
      <AppBar
        title="MemeGif"
        iconElementLeft={<IconButton iconClassName="material-icons">menu</IconButton>}
        onLeftIconButtonTouchTap={props.toggleDrawer}
      />
      <Menu />
      <LoginModal />
      <SignUpModal />
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
  toggleDrawer: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    url: state.getIn(['url']),
    videoInfo: state.getIn(['video', 'info']),
    chunks: state.getIn(['video', 'chunks']),
  };
}

const App = connect(mapStateToProps, { ...settings })(AppComponent);

export { App as default };
