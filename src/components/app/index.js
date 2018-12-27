import React, {Component} from 'react';

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';

import {BrowserRouter, Switch, Link, Route} from 'react-router-dom';

import * as authActions from 'stores/auth/actions';
import * as alertModalActions from 'stores/alert-modal/actions';

import AlertModalService from 'services/alert-modal';
import AuthService from 'services/auth';

import Home from 'components/home';
import Login from 'components/login';
import Tickets from 'components/tickets';
import PrivateRoute from 'components/private-route/presentational';

import AlertModal from './presentational/alert-modal';
import AuthLink from './presentational/auth-link';

import localizator from 'localization/localizator';
import languageSelector from 'localization/languageSelector';

import routes from 'constants/routes';
import statusCodes from 'constants/statusCodes';

class App extends Component {
  constructor(props) {
    super(props);

    this._alertModalService = new AlertModalService(
      props.dispatchedAlertModalActions
    );
    this._authService = new AuthService(props.dispatchedAuthActions);

    this.onLogOutClick = this._onLogOutClick.bind(this);
    this.onLanguageClick = this._onLanguageClick.bind(this);
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <div className="flex-container-column">
            <div className="app-header flex-container-column">
              <div className="app-header-title">
                <h1>{localizator.translate(localizator.keys.components.app.header.title)}</h1>
              </div>
              <div className="app-header-menu flex-container-row">
                <div className="app-header-menu-link-container">
                  <Link to={routes.pages.home}>{localizator.translate(localizator.keys.components.app.header.links.home)}</Link>
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
            <div className="app-footer flex-container-row">
              <div className="app-languages-container flex-container-column">
                <div className="app-languages-title-container">
                  <span>{localizator.translate(localizator.keys.components.app.footer.languagesTitle)}</span>
                </div>
                <div>
                  <a href="javascript:void(0);" onClick={this.onLanguageClick} data-language="en">English</a>
                </div>
                <div>
                  <a href="javascript:void(0);" onClick={this.onLanguageClick} data-language="ru">Русский</a>
                </div>
              </div>
            </div>
          </div>
          <AlertModal
            isAlertModalOpen={this.props.alertModalStore.isOpen}
            onAlertModalClose={this._onAlertModalClose.bind(this)}
            header={this.props.alertModalStore.header}
            message={this.props.alertModalStore.message}/>
        </React.Fragment>
      </BrowserRouter>
    );
  }

  // onClick handlers
  _onLogOutClick(event) {
    event.stopPropagation();

    this._authService.logOut(null, this._onLogOutFailure.bind(this));
  }

  _onLanguageClick(event) {
    event.stopPropagation();

    let language = event.currentTarget.dataset.language;
    languageSelector.set(language);
    this.forceUpdate();
  }

  _onAlertModalClose() {
    this._alertModalService.close();
  }

  // auth service callbacks
  _onLogOutFailure(error) {
    const message = error.response.status === statusCodes.unauthenticated
      ? localizator.translate(localizator.keys.messages.common.unauthenticated)
      : localizator.translate(localizator.keys.messages.common.internalServerError);

    this._alertModalService.open(
      localizator.translate(localizator.keys.components.app.alertModal.errorLabel),
      message
    );
  }
}

export default connect(
  (state, ownProps) => ({authStore: state.auth, alertModalStore: state.alertModal}),
  (dispatch, ownProps) => ({
    dispatchedAuthActions: bindActionCreators(authActions, dispatch),
    dispatchedAlertModalActions: bindActionCreators(alertModalActions, dispatch)
  })
)(App);
