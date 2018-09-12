import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';

import * as authActions from 'stores/auth/actions';

class Home extends Component {

  componentDidMount = () => {
    this.props.authActions.logIn("Sergey");
  }

  isLoggedIn = (authStore) => authStore.userName && authStore.userName.length;

  render() {
    const {authStore, authActions} = this.props;
    return (
      <div>
        Home {
          this.isLoggedIn(authStore) && <div>
              <span>{authStore.userName}</span>
              <button onClick={() => authActions.logOut(authStore.userName)}>log out</button>
            </div>
        }
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({authStore: state.auth}),
  (dispatch, ownProps) => ({
    authActions: bindActionCreators(authActions, dispatch)
  })
)(Home);
