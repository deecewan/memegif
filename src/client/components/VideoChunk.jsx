import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import styles from '../styles/VideoChunk.pcss';

const VideoChunk = props => (
  <Paper zDepth={1} className={styles.paper}>
    <img
      alt={`Video Chunk from ${props.timeStart} to ${props.timeEnd}`}
      src={props.gifUrl}
      className={styles.image}
    />
    <p>From {props.timeStart} to {props.timeEnd}.</p>
  </Paper>
);

VideoChunk.propTypes = {
  id: PropTypes.string,
  gifUrl: PropTypes.string,
  timeStart: PropTypes.number,
  timeEnd: PropTypes.number,
};

export default VideoChunk;
