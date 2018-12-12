import React, {Component} from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';

import axios from 'axios';

import * as authActions from 'stores/auth/actions';

class Login extends Component {
  LOGIN_TYPE = 0;
  REGISTRATION_TYPE = 1;

  constructor(props) {
    super();

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

    this.onInputChange = (event) => {
      const copyOfState = JSON.parse(JSON.stringify(this.state));
      copyOfState[event.target.dataset.type][event.target.name] = event.target.value;
      this.setState(copyOfState);
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevProps.authStore.isLoggedIn && this.props.authStore.isLoggedIn) {
      this
        .props
        .history
        .push('/');
    }
  }

  _renderLogInForm() {
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
          <button onClick={() => this._switchType(this.REGISTRATION_TYPE)}>To registration form</button>
          <button onClick={() => this._logInClick()}>Log In</button>
        </div>
      </div>
    );
  }

  _renderRegistrationForm() {
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
          <button onClick={() => this._switchType(this.LOGIN_TYPE)}>To log in form</button>
          <button onClick={() => this._registerClick()}>Register</button>
        </div>
      </div>
    );
  }

  _renderLoggedInForm() {
    return (
      <div className="flex-container-column login-container">
        <div className="login-title-container">
          <h2>{this.props.authStore.username}, you are already logged in!</h2>
        </div>
      </div>
    );
  }

  render() {
    let markup = this.props.authStore.isLoggedIn
      ? this._renderLoggedInForm()
      : this.state.type === this.LOGIN_TYPE
        ? this._renderLogInForm()
        : this._renderRegistrationForm();
    return markup;
  }

  _logInClick() {
    const login = this.state.login;
    if (!login.username || !login.password) {
      alert('Fill all fields!');
      return;
    }

    axios
      .post('/login', {
        username: login.username,
        password: login.password
      })
      .then(() => {
        this
          .props
          .authActions
          .logIn(this.state.login.username);
      }, (error) => {
        // todo: move to constants
        if (error.response.status === 401) {
          alert('Wrong credentials!');
          return;
        }

        alert('Internal Server Error!');
      });
  }

  _registerClick() {
    const registration = this.state.registration;
    if (!registration.username || !registration.password || !registration.conformPassword) {
      alert('Fill all fields!');
      return;
    }

    if (registration.password !== registration.conformPassword) {
      alert('Passwords are not equal!');
      return;
    }

    axios
      .post('/register', {
        username: registration.username,
        password: registration.password,
        conformPassword: registration.conformPassword
      })
      .then(() => {
        alert('Registartion completed!');
        this._switchType(this.LOGIN_TYPE);
      }, (error) => {
        alert('Registartion failed! Try again!');
      });
  }

  _switchType(type) {
    this.setState({type: type});
  }
}

export default connect(
  (state, ownProps) => ({authStore: state.auth}),
  (dispatch, ownProps) => ({
    authActions: bindActionCreators(authActions, dispatch)
  })
)(Login);
