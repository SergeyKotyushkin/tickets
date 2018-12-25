import React from 'react';

import {withI18n} from "react-i18next";
import Localizator from 'localization/localizator';

class LogInBlock extends React.Component {
  render() {
    const {t} = this.props;

    return (
      <React.Fragment>
        <div className="login-title-container">
          <h2>{t(Localizator.keys.components.login.logIn.title)}</h2>
        </div>
        <div className="login-inputs-container">
          <div className="login-username-container">
            <label htmlFor="login-username__input">{t(Localizator.keys.components.login.logIn.usernameLabel)}</label>
            <input
              type="text"
              id="login-username__input"
              name="username"
              data-type="login"
              value={this.props.username}
              onChange={this.props.onInputChange}/>
          </div>
          <div className="login-password-container">
            <label htmlFor="login-password__input">{t(Localizator.keys.components.login.logIn.passwordLabel)}</label>
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
          <button onClick={this.props.onSwitchTypeClick}>{t(Localizator.keys.components.login.logIn.toRegistrationButtonLabel)}</button>
          <button onClick={this.props.onLogInClick}>{t(Localizator.keys.components.login.logIn.logInButtonLabel)}</button>
        </div>
      </React.Fragment>
    );
  }
}

export default withI18n()(LogInBlock);
