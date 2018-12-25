import React from 'react';

import {connect} from 'react-redux';

import LogInSpan from './presentational/log-in-span';
import LoggedInSpan from './presentational/logged-in-span';

import {withI18n} from "react-i18next";
import Localizator from 'localization/localizator';

class Home extends React.Component {
  render() {
    const {t} = this.props;

    return (
      <div className="flex-container-column home-container">
        <div>
          <span>{t(Localizator.keys.components.home.welcomeText)}</span>
          <div className="home-additional-info">
            {this.props.authStore.isAuthenticated && <LoggedInSpan/>}
            {!this.props.authStore.isAuthenticated && <LogInSpan/>}
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state, ownProps) => ({authStore: state.auth}))(
  withI18n()(
    Home
  )
);
