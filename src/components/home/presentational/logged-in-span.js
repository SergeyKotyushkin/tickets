import React from 'react';

import {Link} from 'react-router-dom';

import {withI18n} from "react-i18next";
import Localizator from 'localization/localizator';

import routes from 'constants/routes';

class LoggedInSpan extends React.Component {
  render() {
    const {t} = this.props;

    return (
      <React.Fragment>
        <span>{t(Localizator.keys.components.home.loggedInPart1Text)}</span>
        <Link to={routes.pages.tickets} className="home-logged-in-tickets-link">{t(Localizator.keys.components.home.loggedInTicketsLinkText)}</Link>
        <span>{t(Localizator.keys.components.home.loggedInPart2Text)}</span>
      </React.Fragment>
    );
  }
}

export default withI18n()(LoggedInSpan);
