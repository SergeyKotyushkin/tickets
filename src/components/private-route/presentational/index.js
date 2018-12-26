import React from 'react';

import {connect} from 'react-redux';

import {Route, Redirect} from 'react-router-dom';

import storageKeys from 'constants/storageKeys';
import routes from 'constants/routes';

class PrivateRoute extends React.Component {
  render() {
    const {
      component: Component,
      ...rest
    } = this.props;

    return (<Route {...rest} render={this._routeRender.bind(this, Component)}/>);
  }

  _routeRender(Component, props) {
    return this._isAuthentificated()
      ? <Component {...props}/>
      : <Redirect to={routes.pages.logIn}/>
  }

  _isAuthentificated() {
    return this.props.authStore.isAuthenticated || localStorage.getItem(
      storageKeys.auth
    );
  }
}

export default connect((state, ownProps) => ({authStore: state.auth}))(
  PrivateRoute
);
