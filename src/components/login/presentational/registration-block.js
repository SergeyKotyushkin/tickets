import React from 'react';

export default class RegistrationBlock extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="login-title-container">
          <h2>Registration</h2>
        </div>
        <div className="login-inputs-container">
          <div className="registration-username-container">
            <label htmlFor="registration-username__input">Username</label>
            <input
              type="text"
              id="registration-username__input"
              name="username"
              data-type="registration"
              value={this.props.username}
              onChange={this.props.onInputChange}/>
          </div>
          <div className="registration-password-container">
            <label htmlFor="registration-password__input">Password</label>
            <input
              type="password"
              id="registration-password__input"
              name="password"
              data-type="registration"
              value={this.props.password}
              onChange={this.props.onInputChange}/>
          </div>
          <div className="registration-conform-password-container">
            <label htmlFor="registration-conform-password__input">Confirm Password</label>
            <input
              type="password"
              id="registration-conform-password__input"
              name="conformPassword"
              data-type="registration"
              value={this.props.conformPassword}
              onChange={this.props.onInputChange}/>
          </div>
        </div>
        <div className="login-controls-container">
          <button onClick={this.props.onSwitchTypeClick}>To log in form</button>
          <button onClick={this.props.onRegisterClick}>Register</button>
        </div>
      </React.Fragment>
    );
  }
}
