import React, {Component} from 'react';

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';

import {BrowserRouter, Switch, Link, Route, Redirect} from 'react-router-dom';

import * as authActions from 'stores/auth/actions';

import AuthService from 'services/auth';

import Home from 'components/home';
import Login from 'components/login';
import Tickets from 'components/tickets';
import PrivateRoute from 'components/private-route/presentational';

import AuthLink from './presentational/auth-link';

import {withI18n} from "react-i18next";
import Localizator from 'localization/localizator';

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
    const {t} = this.props;

    return (
      <BrowserRouter>
        <div className="flex-container-column">
          <div className="app-header flex-container-column">
            <div className="app-header-title">
              <h1>{t(Localizator.keys.components.app.header.title)}</h1>
            </div>
            <div className="app-header-menu flex-container-row">
              <div className="app-header-menu-link-container">
                <Link to={routes.pages.home}>{t(Localizator.keys.components.app.header.links.home)}</Link>
              </div>
              <AuthLink
                isAuthenticated={this.props.authStore.isAuthenticated}
                username={this.props.authStore.username}
                onLogOutClick={this.onLogOutClick}/>
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
)(withI18n()(App));
