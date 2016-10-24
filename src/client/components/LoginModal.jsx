import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

// import actions
import * as userActions from '../actions/user';
import * as settingsActions from '../actions/settings';

class LoginModal extends PureComponent {

  static propTypes = {
    open: PropTypes.bool,
    doLogin: PropTypes.func,
    closeLoginModal: PropTypes.func,
  };

  state = {
    email: '',
    password: '',
  };

  clearFields() {
    this.setState({
      email: '',
      password: '',
    });
  }

  closeModal() {
    this.clearFields();
    this.props.closeLoginModal();
  }

  doLogin() {
    this.props.doLogin(this.state);
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
        onTouchTap={() => this.doLogin()}
      />,
    ];

    return (
      <Dialog
        title="Log In"
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={() => this.closeModal()}
      >
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
      </Dialog>
    );
  }
}

function mapStateToProps(state) {
  return {
    open: state.getIn(['settings', 'loginModal']),
  };
}

export default connect(mapStateToProps, { ...userActions, ...settingsActions })(LoginModal);
