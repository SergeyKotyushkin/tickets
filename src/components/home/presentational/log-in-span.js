import React from 'react';

import {Link} from 'react-router-dom';

import {withI18n} from "react-i18next";
import Localizator from 'localization/localizator';

import routes from 'constants/routes';

class LogInSpan extends React.Component {
  render() {
    const {t} = this.props;

    return (
      <React.Fragment>
        <span>{t(Localizator.keys.components.home.logInPart1Text)}</span>
        <Link to={routes.pages.logIn} className="home-log-in-link">{t(Localizator.keys.components.home.logInLinkText)}</Link>
        <span>{t(Localizator.keys.components.home.logInPart2Text)}</span>
      </React.Fragment>
    );
  }
}

export default withI18n()(LogInSpan);
