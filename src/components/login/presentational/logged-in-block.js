import React from 'react';

import labels from 'constants/labels';

export default class LoggedInBlock extends React.Component {
  render() {
    return (
      <div className="login-title-container">
        <h2>{this.props.username}{labels.components.login.loggedIn.messagePart2}</h2>
      </div>
    );
  }
}
