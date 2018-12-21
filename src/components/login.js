import React, {Component} from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';

import * as authActions from 'stores/auth/actions';

import AuthService from 'services/auth';
import RouteService from 'services/route';

import messages from 'constants/messages';
import statusCodes from 'constants/statusCodes';

class Login extends Component {
  LOGIN_TYPE = 0;
  REGISTRATION_TYPE = 1;

  constructor(props) {
    super(props);

    this.state = {
      login: {
        username: '',
        password: ''
      },
      registration: {
        username: '',
        password: '',
        conformPassword: ''
      },
      type: this.LOGIN_TYPE
    }

    this._authService = new AuthService(props.dispatchedAuthActions);
    this._routeService = new RouteService();

    this.onInputChange = this._onInputChange.bind(this);
    this.onLogInClick = this._onLogInClick.bind(this);
    this.onRegisterClick = this._onRegisterClick.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.authStore.isAuthenticated) {
      this._routeService.redirectToHome(this.props.history);
    }
  }

  render() {
    let markup = this.props.authStore.isAuthenticated
      ? this._getLoggedInMarkup()
      : this.state.type === this.LOGIN_TYPE
        ? this._getLogInMarkup()
        : this._getRegistrationMarkup();
    return markup;
  }

  // markups
  _getLoggedInMarkup() {
    return (
      <div className="flex-container-column login-container">
        <div className="login-title-container">
          <h2>{this.props.authStore.username}, you are already logged in!</h2>
        </div>
      </div>
    );
  }

  _getLogInMarkup() {
    return (
      <div className="flex-container-column login-container">
        <div className="login-title-container">
          <h2>Log In</h2>
        </div>
        <div className="login-inputs-container">
          <div className="login-username-container">
            <label htmlFor="login-username__input">Username</label>
            <input
              type="text"
              id="login-username__input"
              name="username"
              data-type="login"
              value={this.state.login.username}
              onChange={this.onInputChange}/>
          </div>
          <div className="login-password-container">
            <label htmlFor="login-password__input">Password</label>
            <input
              type="password"
              id="login-password__input"
              name="password"
              data-type="login"
              value={this.state.login.password}
              onChange={this.onInputChange}/>
          </div>
        </div>
        <div className="login-controls-container">
          <button onClick={this._onSwitchTypeClick.bind(this, this.REGISTRATION_TYPE)}>To registration form</button>
          <button onClick={this.onLogInClick}>Log In</button>
        </div>
      </div>
    );
  }

  _getRegistrationMarkup() {
    return (
      <div className="flex-container-column login-container">
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
              value={this.state.registration.username}
              onChange={this.onInputChange}/>
          </div>
          <div className="registration-password-container">
            <label htmlFor="registration-password__input">Password</label>
            <input
              type="password"
              id="registration-password__input"
              name="password"
              data-type="registration"
              value={this.state.registration.password}
              onChange={this.onInputChange}/>
          </div>
          <div className="registration-conform-password-container">
            <label htmlFor="registration-conform-password__input">Confirm Password</label>
            <input
              type="password"
              id="registration-conform-password__input"
              name="conformPassword"
              data-type="registration"
              value={this.state.registration.conformPassword}
              onChange={this.onInputChange}/>
          </div>
        </div>
        <div className="login-controls-container">
          <button onClick={this._onSwitchTypeClick.bind(this, this.LOGIN_TYPE)}>To log in form</button>
          <button onClick={this.onRregisterClick}>Register</button>
        </div>
      </div>
    );
  }

  // onChange handlers
  _onInputChange(event) {
    const copyOfState = JSON.parse(JSON.stringify(this.state));
    copyOfState[event.target.dataset.type][event.target.name] = event.target.value;
    this.setState(copyOfState);
  }

  // onClick handlers
  _onSwitchTypeClick(type) {
    this._switchType(type);
  }

  _onLogInClick() {
    const login = this.state.login;
    if (!login.username || !login.password) {
      alert(messages.logIn.someFieldsAreNotFilled);
      return;
    }

    this._authService.logIn(
      login.username,
      login.password,
      null,
      this._onLogInFailure
    );
  }

  _onRegisterClick() {
    const registration = this.state.registration;
    if (!registration.username || !registration.password || !registration.conformPassword) {
      alert(messages.registration.someFieldsAreNotFilled);
      return;
    }

    if (registration.password !== registration.conformPassword) {
      alert(messages.registration.passwordsAreNotEqual);
      return;
    }

    this._authService.register(
      registration.username,
      registration.password,
      registration.conformPassword,
      this._onRegisterSuccess.bind(this),
      this._onRegisterFailure.bind(this)
    );
  }

  // auth service callbacks
  _onRegisterSuccess() {
    alert(messages.registration.registrationIsComplete);
    this._switchType(this.LOGIN_TYPE)
  }

  _onLogInFailure(error) {
    const message = error.response.status === statusCodes.unauthenticated
      ? messages.logIn.wrongCredentials
      : messages.common.internalServerError;

    alert(message);
  }

  _onRegisterFailure(error) {
    let message;
    switch (error.response.status) {
      case statusCodes.authenticated:
        message = messages.registration.alreadyAuthenticated;
        break;
      case statusCodes.badRequest:
        message = error.response.data.reason;
        break;
      default:
        message = messages.common.internalServerError;
        break;
    }

    alert(message);
  }

  // local
  _switchType(type) {
    this.setState({type: type});
  }
}

export default connect(
  (state, ownProps) => ({authStore: state.auth}),
  (dispatch, ownProps) => ({
    dispatchedAuthActions: bindActionCreators(authActions, dispatch)
  })
)(Login);
