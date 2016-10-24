import React, { PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import SubHeader from 'material-ui/Subheader';

import Divider from 'material-ui/Divider';
import LockOpenIcon from 'material-ui/svg-icons/action/lock-open';
import LockIcon from 'material-ui/svg-icons/action/lock-outline';
import PersonAddIcon from 'material-ui/svg-icons/social/person-add';
import { connect } from 'react-redux';
// actions we need
import * as settingsActions from '../actions/settings';
import * as userActions from '../actions/user';

function getMenu(props) {
  if (!props.user.name) {
    // we have a user
    return [
      <MenuItem key={1}>Hey there, stranger.</MenuItem>,
      <MenuItem key={2} onTouchTap={() => { props.openLoginModal(); props.closeDrawer(); }}>
        <FlatButton icon={<LockOpenIcon />} label="Login" />
      </MenuItem>,
      <MenuItem key={3}>
        <FlatButton icon={<PersonAddIcon />} label="Sign Up" />
      </MenuItem>,
    ];
  }
  return [
    <MenuItem key={1}>Hey {props.user.name.split(' ')[0]}!</MenuItem>,
    <MenuItem key={2} onTouchTap={() => { props.doLogout(); props.closeDrawer(); }}>
      <FlatButton icon={<LockIcon />} label="Logout" />
    </MenuItem>,
    <Divider key={3} />,
    <List key={4}>
      <SubHeader>Past Searches</SubHeader>
      {
        props.user.searches.map((search, i) => {
          if (search.type === 'url') {
            return (<ListItem
              key={i}
              primaryText={search.youtubeTitle}
              secondaryText={search.term}
            />);
          }
          return (
            <ListItem
              key={i}
              primaryText={search.term}
            />
          );
        })
      }
    </List>,
  ];
}

function MenuComponent(props) {
  return (
    <Drawer
      docked={false}
      open={props.drawer}
      onRequestChange={props.toggleDrawer}
    >
      {getMenu(props)}
    </Drawer>
  );
}

MenuComponent.propTypes = {
  drawer: PropTypes.bool,
  toggleDrawer: PropTypes.func,
  user: PropTypes.object,
  doLogout: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    drawer: state.getIn(['settings', 'drawer']),
    user: state.get('user').toJS(),
  };
}

const Menu = connect(mapStateToProps, { ...settingsActions, ...userActions })(MenuComponent);

export default Menu;
