import React from 'react';

import localizator from 'localization/localizator';

export default class LogInBlock extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="login-title-container">
          <h2>{localizator.translate(localizator.keys.components.login.logIn.title)}</h2>
        </div>
        <div className="login-inputs-container">
          <div className="login-username-container">
            <label htmlFor="login-username__input">{localizator.translate(localizator.keys.components.login.logIn.usernameLabel)}</label>
            <input
              type="text"
              id="login-username__input"
              name="username"
              data-type="login"
              value={this.props.username}
              onChange={this.props.onInputChange}/>
          </div>
          <div className="login-password-container">
            <label htmlFor="login-password__input">{localizator.translate(localizator.keys.components.login.logIn.passwordLabel)}</label>
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
          <button onClick={this.props.onSwitchTypeClick}>{
              localizator.translate(
                localizator.keys.components.login.logIn.toRegistrationButtonLabel
              )
            }</button>
          <button onClick={this.props.onLogInClick}>{localizator.translate(localizator.keys.components.login.logIn.logInButtonLabel)}</button>
        </div>
      </React.Fragment>
    );
  }
}
