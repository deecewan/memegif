import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';

const styles = {
  paper: {
    width: '20%',
    margin: '2rem 1rem 0',
    padding: '1rem',
    textAlign: 'center',
    display: 'inline-block',
  },
  image: {
    width: '100%',
    marginBottom: '1rem',
  },
};

/*
  Need to do some validation.  If the mimetype is a gif return an <img />
  If it's mp4/h264, return <video />
 */


const VideoChunk = props => (
  <Paper zDepth={1} key={props.id} style={styles.paper}>
    <video
      loop
      autoPlay
      alt={`Video Chunk from ${props.timeStart} to ${props.timeEnd}`}
      src={props.gifUrl}
      style={styles.image}
    />
    <p>From {props.timeStart} to {props.timeEnd}.</p>
  </Paper>
);

VideoChunk.propTypes = {
  id: PropTypes.number,
  gifUrl: PropTypes.string,
  timeStart: PropTypes.number,
  timeEnd: PropTypes.number,
};

export default VideoChunk;
