import React, { PropTypes } from 'react';
import Radium from 'radium';
import Paper from 'material-ui/Paper';
import ImmutableProps from 'react-immutable-proptypes';

const styles = {
  paper: {
    marginTop: '2rem',
    padding: '2rem',
    display: 'flex',
    alignItems: 'center',
  },
  inner: {
    display: 'inline-block',
  },
  title: {
    marginLeft: '1rem',
  },
};

/**
 * @return {null}
 */
const VideoInfo = props => {
  if (!props.url) {
    return null;
  }

  if (props.videoInfo.get('title') === '') {
    return (
      <Paper zDepth={1} style={styles}>
        <p>Creating Gif from: {props.url}</p>
      </Paper>
    );
  }

  const videoInfo = props.videoInfo.toJS();

  return (
    <Paper zDepth={1} style={styles.paper}>
      <div style={styles.inner}>
        <img alt="Thumbnail" src={videoInfo.thumbnails.default.url} />
      </div>
      <div style={{ ...styles.inner, ...styles.title }}>
        <h3>{videoInfo.title}</h3>
        <h5>{videoInfo.channel}</h5>
      </div>
    </Paper>
  );
};

VideoInfo.propTypes = {
  url: PropTypes.string,
  videoInfo: ImmutableProps.map,
};

export default new Radium(VideoInfo);

