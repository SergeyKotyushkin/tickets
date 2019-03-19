import React from 'react';

import localizator from 'localization/localizator';

export default class LoggedInBlock extends React.Component {
  render() {
    return (
      <div className="login-title-container">
        <h2>{this.props.username}{localizator.translate(localizator.keys.components.login.loggedIn.messagePart2)}</h2>
      </div>
    );
  }
}
