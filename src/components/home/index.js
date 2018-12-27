import React from 'react';

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';

import * as authActions from 'stores/auth/actions';
import * as alertModalActions from 'stores/alert-modal/actions';

import AuthService from 'services/auth';
import AlertModalService from 'services/alert-modal';

import LogInSpan from './presentational/log-in-span';
import LoggedInSpan from './presentational/logged-in-span';

import localizator from 'localization/localizator';

import statusCodes from 'constants/statusCodes';
import storageKeys from 'constants/storageKeys';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this._alertModalService = new AlertModalService(
      props.dispatchedAlertModalActions
    );
    this._authService = new AuthService(props.dispatchedAuthActions);
  }

  componentDidMount() {
    if (!this.props.authStore.isAuthenticated && localStorage.getItem(storageKeys.auth)) {
      this._authService.tryLogIn(null, this._handleError.bind(this));
      return;
    }
  }

  render() {
    return (
      <div className="flex-container-column home-container">
        <div>
          <span>{localizator.translate(localizator.keys.components.home.welcomeText)}</span>
          <div className="home-additional-info">
            {this.props.authStore.isAuthenticated && <LoggedInSpan/>}
            {!this.props.authStore.isAuthenticated && <LogInSpan/>}
          </div>
        </div>
      </div>
    );
  }

  // local
  _handleError(error) {
    this._alertModalService.open(
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
)(Home);
