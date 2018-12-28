import React from 'react';

import LogInLink from './log-in-link';
import LogOutLink from './log-out-link';

export default class AuthLink extends React.Component {
  render() {
    return (
      this.props.isAuthenticated
        ? <LogOutLink
          username={this.props.username}
          onLogOutClick={this.props.onLogOutClick}/>
        : <LogInLink/>
    );
  }
};
