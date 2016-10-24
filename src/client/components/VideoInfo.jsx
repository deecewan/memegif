import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import ImmutableProps from 'react-immutable-proptypes';
import styles from '../styles/VideoInfo.pcss';


/**
 * @return {null}
 */
const VideoInfo = props => {
  if (!props.url) {
    return null;
  }

  if (props.videoInfo.get('title') === '') {
    return (
      <Paper zDepth={1} className={styles.paper}>
        <p>Creating Gif from: {props.url}</p>
      </Paper>
    );
  }

  const videoInfo = props.videoInfo.toJS();

  return (
    <Paper zDepth={1} className={styles.paper}>
      <div className={styles.inner}>
        <img alt="Thumbnail" src={videoInfo.thumbnails.default.url} />
      </div>
      <div className={styles.title}>
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

export default VideoInfo;
