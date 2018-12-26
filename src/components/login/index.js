import React, {Component} from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';

import * as authActions from 'stores/auth/actions';

import AuthService from 'services/auth';
import RouteService from 'services/route';

import LoggedInBlock from './presentational/logged-in-block';
import LogInBlock from './presentational/log-in-block';
import RegistrationBlock from './presentational/registration-block';

import messages from 'constants/messages';
import statusCodes from 'constants/statusCodes';
import storageKeys from 'constants/storageKeys';

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
    this.onSwitchTypeClick = this._onSwitchTypeClick.bind(this);
  }

  componentDidMount() {
    if (!this.props.authStore.isAuthenticated && localStorage.getItem(storageKeys.auth)) {
      this._authService.tryLogIn(null, this._handleError.bind(this));
      return;
    }
  }

  render() {
    let markup = this.props.authStore.isAuthenticated
      ? <LoggedInBlock username={this.props.authStore.username}/>
      : this.state.type === this.LOGIN_TYPE
        ? <LogInBlock
            username={this.state.login.username}
            password={this.state.login.password}
            onInputChange={this.onInputChange}
            onSwitchTypeClick={this.onSwitchTypeClick.bind(this, this.REGISTRATION_TYPE)}
            onLogInClick={this.onLogInClick}/>
        : <RegistrationBlock
          username={this.state.login.username}
          password={this.state.login.password}
          conformPassword={this.state.login.conformPassword}
          onInputChange={this.onInputChange}
          onSwitchTypeClick={this._onSwitchTypeClick.bind(this, this.LOGIN_TYPE)}
          onRegisterClick={this.onRegisterClick}/>;

    return (
      <div className="flex-container-column login-container">
        {markup}
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

  _handleError(error) {
    alert(messages.common.internalServerError);
  }
}

export default connect(
  (state, ownProps) => ({authStore: state.auth}),
  (dispatch, ownProps) => ({
    dispatchedAuthActions: bindActionCreators(authActions, dispatch)
  })
)(Login);
