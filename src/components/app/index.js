import React, {Component} from 'react';

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';

import {BrowserRouter, Switch, Link, Route} from 'react-router-dom';

import * as authActions from 'stores/auth/actions';
import * as alertModalActions from 'stores/alert-modal/actions';
import * as confirmModalActions from 'stores/confirm-modal/actions';

import AlertModalService from 'services/alert-modal';
import ConfirmModalService from 'services/confirm-modal';
import AuthService from 'services/auth';

import Home from 'components/home';
import Login from 'components/login';
import Tickets from 'components/tickets';
import PrivateRoute from 'components/private-route/presentational';

import AlertModal from './presentational/alert-modal';
import ConfirmModal from './presentational/confirm-modal';

import AuthLink from './presentational/auth-link';

import localizator from 'localization/localizator';
import languageSelector from 'localization/languageSelector';

import modalTypes from 'constants/modal-types';
import routes from 'constants/routes';
import statusCodes from 'constants/statusCodes';

class App extends Component {
  constructor(props) {
    super(props);

    this._alertModalService = new AlertModalService(
      props.dispatchedAlertModalActions
    );
    this._authService = new AuthService(props.dispatchedAuthActions);
    this._confirmModalService = new ConfirmModalService(
      props.dispatchedConfirmModalActions
    );

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
          {this._getAlertModalMarkup()}
          {this._getConfirmModalMarkup()}
        </React.Fragment>
      </BrowserRouter>
    );
  }

  // markups
  _getAlertModalMarkup() {
    return this.props.alertModalStore.isOpen
      ? <AlertModal
          isAlertModalOpen={this.props.alertModalStore.isOpen}
          onAlertModalClose={this._onAlertModalClose.bind(this)}
          header={this.props.alertModalStore.header}
          message={this.props.alertModalStore.message}
          modalType={this.props.alertModalStore.modalType}/>
      : <React.Fragment></React.Fragment>;
  }

  _getConfirmModalMarkup() {
    return this.props.confirmModalStore.isOpen
      ? <ConfirmModal
          isConfirmModalOpen={this.props.confirmModalStore.isOpen}
          onConfirmModalClose={this._onConfirmModalClose.bind(this)}
          header={this.props.confirmModalStore.header}
          message={this.props.confirmModalStore.message}
          onYesCallback={this.props.confirmModalStore.onYesCallback}
          onNoCallback={this.props.confirmModalStore.onNoCallback}
          modalType={this.props.confirmModalStore.modalType}/>
      : <React.Fragment></React.Fragment>;
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

  _onConfirmModalClose(callback) {
    this._confirmModalService.close();
    callback && callback();
  }

  // auth service callbacks
  _onLogOutFailure(error) {
    const message = error.response.status === statusCodes.unauthenticated
      ? localizator.translate(localizator.keys.messages.common.unauthenticated)
      : localizator.translate(localizator.keys.messages.common.internalServerError);

    this._alertModalService.open(
      modalTypes.error,
      localizator.translate(localizator.keys.components.app.alertModal.errorLabel),
      message
    );
  }
}

export default connect(
  (state, ownProps) => ({authStore: state.auth, alertModalStore: state.alertModal, confirmModalStore: state.confirmModal}),
  (dispatch, ownProps) => ({
    dispatchedAuthActions: bindActionCreators(authActions, dispatch),
    dispatchedAlertModalActions: bindActionCreators(alertModalActions, dispatch),
    dispatchedConfirmModalActions: bindActionCreators(
      confirmModalActions,
      dispatch
    )
  })
)(App);
