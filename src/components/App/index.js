import React, {Component} from 'react';

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';

import {BrowserRouter, Switch, Link, Route} from 'react-router-dom';

import axios from 'axios';

import * as authActions from 'stores/auth/actions';

import Home from 'components/Home';
import Login from 'components/Login';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="flex-container-column">
          <div className="app-header flex-container-column">
            <div className="app-header-title">
              <h1>Tickets</h1>
            </div>
            <div className="app-header-menu flex-container-row">
              <div className="app-header-menu-link-container">
                <Link to="/">Home</Link>
              </div>
              {!this.props.authStore.isLoggedIn && this._renderLogInLink()}
              {this.props.authStore.isLoggedIn && this._renderLogOutLink()}
            </div>
          </div>
          <div className="app-content">
            <Switch>
              <Route exact={true} path="/" component={Home}></Route>
              <Route path="/login" component={Login}></Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }

  _renderLogInLink() {
    return (
      <div className="app-header-menu-link-container">
        <Link to="/login">Log In</Link>
      </div>
    );
  }

  _renderLogOutLink() {
    return (
      <div className="app-header-menu-link-container">
        <a href="javascript:void(0);" onClick={(event) => this._logOutClick(event)}>Log Out</a>
      </div>
    );
  }

  _logOutClick(event) {
    event.stopPropagation();

    axios
      .get('/logout')
      .then(() => {
        this
          .props
          .authActions
          .logOut();
      }, (error) => {
        alert('Internal Server Error!');
      });
  }
}

export default connect(
  (state, ownProps) => ({authStore: state.auth}),
  (dispatch, ownProps) => ({
    authActions: bindActionCreators(authActions, dispatch)
  })
)(App);
