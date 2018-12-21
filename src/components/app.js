import React, {Component} from 'react';

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';

import {BrowserRouter, Switch, Link, Route, Redirect} from 'react-router-dom';

import * as authActions from 'stores/auth/actions';

import AuthService from 'services/auth';

import Home from 'components/home';
import Login from 'components/login';
import Tickets from 'components/tickets';
import PrivateRoute from 'components/_privateRoute';

import messages from 'constants/messages';
import routes from 'constants/routes';
import statusCodes from 'constants/statusCodes';

class App extends Component {
  constructor(props) {
    super(props);

    this._authService = new AuthService(props.dispatchedAuthActions);

    this.onLogOutClick = this._onLogOutClick.bind(this);
  }

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
                <Link to={routes.pages.home}>Home</Link>
              </div>
              {!this.props.authStore.isAuthenticated && this._getLogInLinkMarkup()}
              {this.props.authStore.isAuthenticated && this._getLogOutLinkMarkup()}
            </div>
          </div>
          <div className="app-content">
            <Switch>
              <Route exact={true} path={routes.pages.home} component={Home}></Route>
              <PrivateRoute exact={true} path={routes.pages.tickets} component={Tickets}></PrivateRoute>
              <Route exact={true} path={routes.pages.logIn} component={Login}></Route>
            </Switch>
          </div>
          <div className="app-footer"></div>
        </div>
      </BrowserRouter>
    );
  }

  // markups
  _getLogInLinkMarkup() {
    return (
      <div className="app-header-menu-link-container">
        <Link to={routes.pages.logIn}>Log In</Link>
      </div>
    );
  }

  _getLogOutLinkMarkup() {
    return (
      <div className="app-header-menu-link-container">
        <a href="javascript:void(0);" onClick={this.onLogOutClick}>{this.props.authStore.username}&nbsp;|&nbsp;Log Out</a>
      </div>
    );
  }

  // onClick handlers
  _onLogOutClick(event) {
    event.stopPropagation();

    this._authService.logOut(null, this._onLogOutFailure.bind(this));
  }

  // auth service callbacks
  _onLogOutFailure(error) {
    const message = error.response.status === statusCodes.unauthenticated
      ? messages.common.unauthenticated
      : messages.common.internalServerError;

    alert(message);
  }
}

export default connect(
  (state, ownProps) => ({authStore: state.auth}),
  (dispatch, ownProps) => ({
    dispatchedAuthActions: bindActionCreators(authActions, dispatch)
  })
)(App);
