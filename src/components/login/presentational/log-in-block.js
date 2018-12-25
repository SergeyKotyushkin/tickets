import React from 'react';

import labels from 'constants/labels';

export default class LogInBlock extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="login-title-container">
          <h2>{labels.components.login.logIn.title}</h2>
        </div>
        <div className="login-inputs-container">
          <div className="login-username-container">
            <label htmlFor="login-username__input">{labels.components.login.logIn.usernameLabel}</label>
            <input
              type="text"
              id="login-username__input"
              name="username"
              data-type="login"
              value={this.props.username}
              onChange={this.props.onInputChange}/>
          </div>
          <div className="login-password-container">
            <label htmlFor="login-password__input">{labels.components.login.logIn.passwordLabel}</label>
            <input
              type="password"
              id="login-password__input"
              name="password"
              data-type="login"
              value={this.props.password}
              onChange={this.props.onInputChange}/>
          </div>
        </div>
        <div className="login-controls-container">
          <button onClick={this.props.onSwitchTypeClick}>{labels.components.login.logIn.toRegistrationButtonLabel}</button>
          <button onClick={this.props.onLogInClick}>{labels.components.login.logIn.logInButtonLabel}</button>
        </div>
      </React.Fragment>
    );
  }
}
