import React, {Component} from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';

import axios from 'axios';

import * as authActions from 'stores/auth/actions';

class Login extends Component {
  constructor(props) {
    super();

    this.state = {
      username: '',
      password: ''
    }

    this.onInputChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      });
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

  renderLogInForm() {
    return (
      <div className="flex-container-column login-container">
        <div className="login-title-container">
          <h2>Login</h2>
        </div>
        <div className="login-inputs-container">
          <div className="login-username-container">
            <label htmlFor="login-username__input">Username</label>
            <input
              type="text"
              id="login-username__input"
              name="username"
              value={this.state.username}
              onChange={this.onInputChange}/>
          </div>
          <div className="login-password-container">
            <label htmlFor="login-password__input">Password</label>
            <input
              type="password"
              id="login-password__input"
              name="password"
              value={this.state.password}
              onChange={this.onInputChange}/>
          </div>
        </div>
        <div className="login-controls-container">
          <button onClick={() => this._logInClick()}>Log In</button>
        </div>
      </div>
    );
  }

  renderLoggedInForm() {
    return (
      <div className="flex-container-column login-container">
        <div className="login-title-container">
          <h2>{this.props.authStore.userName}, you are already logged in!</h2>
        </div>
      </div>
    );
  }

  render() {
    let markup = this.props.authStore.isLoggedIn
      ? this.renderLoggedInForm()
      : this.renderLogInForm();
    return markup;
  }

  _logInClick() {
    console.log('log in clicked', this.state, this.props.authStore);

    axios
      .post('/login', {
        username: this.state.username,
        password: this.state.password
      })
      .then(() => {
        this
          .props
          .authActions
          .logIn(this.state.username);
      }, (error) => {
        // todo: move to constants
        if (error.response.status === 401) {
          alert('Wrong credentials!');
          return;
        }

        alert('Internal Server Error!');
      });
  }
}

export default connect(
  (state, ownProps) => ({authStore: state.auth}),
  (dispatch, ownProps) => ({
    authActions: bindActionCreators(authActions, dispatch)
  })
)(Login);
