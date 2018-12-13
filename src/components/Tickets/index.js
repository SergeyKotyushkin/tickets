import React, {Component} from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';

import axios from 'axios';

import * as authActions from 'stores/auth/actions';
import AuthService from 'services/auth';
import HistoryService from 'services/history';

class Tickets extends Component {
  constructor(props) {
    super(props);

    this._authService = new AuthService(props.dispatchedAuthActions);
    this._historyService = new HistoryService(props.history);
  }

  componentDidMount() {
    this
      ._authService
      .tryLogIn();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.authStore.isLoggedIn && !this.props.authStore.isLoggedIn) {
      this._redirectToLogin();
    }
  }

  render() {
    return (<h2>_Tickets_</h2>);
  }

  _redirectToLogin() {
    this
      ._historyService
      .push(routes.logIn);
  }
}

export default connect(
  (state, ownProps) => ({authStore: state.auth}),
  (dispatch, ownProps) => ({
    dispatchedAuthActions: bindActionCreators(authActions, dispatch)
  })
)(Tickets);
