import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

// import actions
import * as userActions from '../actions/user';
import * as settingsActions from '../actions/settings';

class SignUpModal extends PureComponent {

  static propTypes = {
    open: PropTypes.bool,
    doSignup: PropTypes.func,
    closeSignupModal: PropTypes.func,
  };

  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    confirmError: '',
  };

  clearFields() {
    this.setState({
      email: '',
      password: '',
    });
  }

  closeModal() {
    this.clearFields();
    this.props.closeSignupModal();
  }

  doSignup() {
    this.props.doSignup(this.state);
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        onTouchTap={() => this.closeModal()}
      />,
      <RaisedButton
        label="Submit"
        primary
        onTouchTap={() => this.doSignup()}
      />,
    ];

    return (
      <Dialog
        title="Sign Up"
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={() => this.closeModal()}
      >
        <TextField
          floatingLabelText="Name"
          fullWidth
          value={this.state.name}
          onChange={e => this.setState({ name: e.target.value })}
        />
        <TextField
          floatingLabelText="Email Address"
          fullWidth
          value={this.state.email}
          onChange={e => this.setState({ email: e.target.value })}
        />
        <TextField
          floatingLabelText="Password" type="password"
          fullWidth
          value={this.state.password}
          onChange={e => this.setState({ password: e.target.value })}
        />
        <TextField
          floatingLabelText="Confirm Password" type="password"
          fullWidth
          value={this.state.confirm}
          onChange={e => this.setState({ confirm: e.target.value })}
          errorText={this.state.confirmError}
          onBlur={() => {
            if (this.state.confirm !== this.state.password) {
              this.setState({ confirmError: 'Please enter matching passwords.' });
            } else {
              this.setState({ confirmError: '' });
            }
          }}
        />
      </Dialog>
    );
  }
}

function mapStateToProps(state) {
  return {
    open: state.getIn(['settings', 'signupModal']),
  };
}

export default connect(mapStateToProps, { ...userActions, ...settingsActions })(SignUpModal);
