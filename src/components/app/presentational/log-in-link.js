import React from 'react';

import {Link} from 'react-router-dom';

import {withI18n} from "react-i18next";
import Localizator from 'localization/localizator';

import routes from 'constants/routes';

class LogInLink extends React.Component {
  render() {
    const {t} = this.props;

    return (
      <React.Fragment>
        <div className="app-header-menu-link-container">
          <Link to={routes.pages.logIn}>{t(Localizator.keys.components.app.header.links.logIn)}</Link>
        </div>
      </React.Fragment>
    );
  }
}

export default withI18n()(LogInLink);
