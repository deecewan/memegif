import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import * as url from '../actions/url';
import styles from '../styles/UrlBar.pcss';

class UrlBar extends PureComponent {

  static youtubeRegex = /https:\/\/(www.)?youtu.?be(.com\/watch\?v=|\/)(.*)/;
  static randomUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

  static propTypes = {
    url: PropTypes.string,
    submitUrl: PropTypes.func,
    clearUrl: PropTypes.func,
    getVideoTitle: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      feed: false,
      url: props.url,
      error: '',
    };
  }

  submitUrl(e) {
    if (e) {
      e.preventDefault();
    }
    if (!UrlBar.youtubeRegex.test(this.state.url)) {
      return this.setState({
        error: 'Please enter a valid YouTube URL',
      });
    }
    this.setState({ error: '' });
    // do validation, etc, here
    return this.props.submitUrl(this.state.url);
  }

  changeUrl(newUrl) {
    this.setState({
      url: newUrl,
      error: '',
    });
  }

  render() {
    return (
      <form onSubmit={e => this.submitUrl(e)}>
        <TextField
          errorText={this.state.error}
          floatingLabelText="YouTube URL"
          className={styles['text-field']}
          name="search-term"
          value={this.state.url}
          onChange={e => this.changeUrl(e.target.value)}
        />
        <FlatButton
          className={styles.buttons}
          label="Clear"
          onTouchTap={() => {
            this.setState({ url: '' });
            this.props.clearUrl();
          }}
        />
        <RaisedButton
          label="I'm Feeling Lucky"
          className={styles.buttons}
          onTouchTap={() => {
            let current = 1;
            const time = setInterval(() => {
              if (current > UrlBar.randomUrl.length) {
                return clearInterval(time);
              }
              this.setState({
                url: UrlBar.randomUrl.substring(0, current),
              }, () => {
                if (this.state.url === UrlBar.randomUrl) {
                  this.submitUrl();
                }
              });
              return current++;
            }, 25);
          }}
        />
        <RaisedButton
          className={styles.buttons}
          label={`${this.state.feed ? 'Unwatch' : 'Watch'} the feed`}
          onClick={() => {
            if (this.state.feed) {
              window.socket.emit('leave_all');
            } else {
              window.socket.emit('join_all');
            }
            this.setState({ feed: !this.state.feed });
          }}
        />
        <RaisedButton
          className={styles.buttons}
          label="Submit"
          type="submit"
        />
      </form>
    );
  }
}

const Component = connect(null, url)(UrlBar);

export { Component as default };
