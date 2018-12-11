import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';

import * as authActions from 'stores/auth/actions';

class Home extends Component {
  render() {
    return (
      <div>
        Home {this._getIsLoggedIn() && this._renderLogOutMarkup()}
      </div>
    );
  }

  _renderLogOutMarkup() {
    return (
      <div>
        <span>{this.props.authStore.userName}</span>
        <button onClick={() => this._logOutClick()}>log out</button>
      </div>
    );
  }

  _getIsLoggedIn() {
    return this.props.authStore.isLoggedIn;
  }

  _logOutClick() {
    this
      .props
      .authActions
      .logOut(this.props.authStore.userName);
  }
}

export default connect(
  (state, ownProps) => ({authStore: state.auth}),
  (dispatch, ownProps) => ({
    authActions: bindActionCreators(authActions, dispatch)
  })
)(Home);
