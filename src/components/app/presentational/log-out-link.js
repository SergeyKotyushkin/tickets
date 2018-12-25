import React from 'react';

import {withI18n} from "react-i18next";
import Localizator from 'localization/localizator';

class LogOutLink extends React.Component {
  render() {
    const {t} = this.props;

    return (
      <React.Fragment>
        <div className="app-header-menu-link-container">
          <a href="javascript:void(0);" onClick={this.props.onLogOutClick}>
            <span>{this.props.username}</span>
            <span className="app-header-menu-link-log-out-delimiter">{t(Localizator.keys.components.app.header.links.logOutDelimiter)}</span>
            <span>{t(Localizator.keys.components.app.header.links.logOut)}</span>
          </a>
        </div>
      </React.Fragment>
    );
  }
}

export default withI18n()(LogOutLink);
