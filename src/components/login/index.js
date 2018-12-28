import React, {Component} from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';

import * as authActions from 'stores/auth/actions';
import * as alertModalActions from 'stores/alert-modal/actions';

import AlertModalService from 'services/alert-modal';
import AuthService from 'services/auth';
import RouteService from 'services/route';

import LoggedInBlock from './presentational/logged-in-block';
import LogInBlock from './presentational/log-in-block';
import RegistrationBlock from './presentational/registration-block';

import localizator from 'localization/localizator';

import badRequestTypes from 'constants/bad-request-types';
import modalTypes from 'constants/modal-types';
import statusCodes from 'constants/statusCodes';
import storageKeys from 'constants/storageKeys';

import 'static/css/login.css';

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

    this._alertModalService = new AlertModalService(
      props.dispatchedAlertModalActions
    );
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
          username={this.state.registration.username}
          password={this.state.registration.password}
          conformPassword={this.state.registration.conformPassword}
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
    copyOfState[event.target.dataset.type][event.target.dataset.name] = event.target.value;
    this.setState(copyOfState);
  }

  // onClick handlers
  _onSwitchTypeClick(type) {
    this._switchType(type);
  }

  _onLogInClick() {
    const login = this.state.login;
    if (!login.username || !login.password) {
      this._alertModalService.open(
        modalTypes.error,
        localizator.translate(localizator.keys.components.app.alertModal.errorLabel),
        localizator.translate(localizator.keys.messages.logIn.someFieldsAreNotFilled)
      );
      return;
    }

    this._authService.logIn(
      login.username,
      login.password,
      this._onLogInSuccess.bind(this),
      this._onLogInFailure
    );
  }

  _onRegisterClick() {
    const registration = this.state.registration;
    if (!registration.username || !registration.password || !registration.conformPassword) {
      this._alertModalService.open(
        modalTypes.error,
        localizator.translate(localizator.keys.components.app.alertModal.errorLabel),
        localizator.translate(localizator.keys.messages.registration.someFieldsAreNotFilled)
      );
      return;
    }

    if (registration.password !== registration.conformPassword) {
      this._alertModalService.open(
        modalTypes.error,
        localizator.translate(localizator.keys.components.app.alertModal.errorLabel),
        localizator.translate(localizator.keys.messages.registration.passwordsAreNotEqual)
      );
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
  _onLogInSuccess() {
    this.setState({
      login: {
        username: null,
        password: null
      }
    });

    this._routeService.redirectToHome(this.props.history)
  }

  _onRegisterSuccess() {
    this._alertModalService.open(
      modalTypes.success,
      localizator.translate(localizator.keys.components.app.alertModal.successLabel),
      localizator.translate(localizator.keys.messages.registration.registrationIsComplete)
    );

    this.setState({
      registration: {
        username: null,
        password: null,
        conformPassword: null
      },
      type: this.LOGIN_TYPE
    });
  }

  _onLogInFailure(error) {
    let message = localizator.translate(
      localizator.keys.messages.common.internalServerError
    );
    switch (error.response.status) {
      case statusCodes.unauthenticated:
        message = localizator.translate(
          localizator.keys.messages.logIn.wrongCredentials
        );
        break;
      case statusCodes.badRequest:
        switch (error.response.data.type) {
          case badRequestTypes.someFieldsAreNotFilled:
            message = localizator.translate(
              localizator.keys.messages.registration.someFieldsAreNotFilled
            );
            break;
        }
        break;
    }

    this._alertModalService.open(
      modalTypes.error,
      localizator.translate(localizator.keys.components.app.alertModal.errorLabel),
      message
    );
  }

  _onRegisterFailure(error) {
    let message = localizator.translate(
      localizator.keys.messages.common.internalServerError
    );
    switch (error.response.status) {
      case statusCodes.authenticated:
        message = localizator.translate(
          localizator.keys.messages.registration.alreadyAuthenticated
        );
        break;
      case statusCodes.badRequest:
        switch (error.response.data.type) {
          case badRequestTypes.existingUsername:
            message = localizator.translate(
              localizator.keys.messages.registration.existingUsername
            );
            break;
          case badRequestTypes.someFieldsAreNotFilled:
            message = localizator.translate(
              localizator.keys.messages.registration.someFieldsAreNotFilled
            );
            break;
          case badRequestTypes.passwordsAreNotEqual:
            message = localizator.translate(
              localizator.keys.messages.registration.passwordsAreNotEqual
            );
            break;
        }
        break;
    }

    this._alertModalService.open(
      modalTypes.error,
      localizator.translate(localizator.keys.components.app.alertModal.errorLabel),
      message
    );
  }

  // local
  _switchType(type) {
    this.setState({type: type});
  }

  _handleError(error) {
    this._alertModalService.open(
      modalTypes.error,
      localizator.translate(localizator.keys.components.app.alertModal.errorLabel),
      localizator.translate(localizator.keys.messages.common.internalServerError)
    );
  }
}

export default connect(
  (state, ownProps) => ({authStore: state.auth}),
  (dispatch, ownProps) => ({
    dispatchedAuthActions: bindActionCreators(authActions, dispatch),
    dispatchedAlertModalActions: bindActionCreators(alertModalActions, dispatch)
  })
)(Login);
