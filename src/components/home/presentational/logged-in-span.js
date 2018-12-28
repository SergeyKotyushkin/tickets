import React from 'react';

import {Link} from 'react-router-dom';

import localizator from 'localization/localizator';

import routes from 'constants/routes';

export default class LoggedInSpan extends React.Component {
  render() {
    return (
      <React.Fragment>
        <span>{localizator.translate(localizator.keys.components.home.loggedInPart1Text)}</span>
        <Link to={routes.pages.tickets} className="home-logged-in-tickets-link">{localizator.translate(localizator.keys.components.home.loggedInTicketsLinkText)}</Link>
        <span>{localizator.translate(localizator.keys.components.home.loggedInPart2Text)}</span>
      </React.Fragment>
    );
  }
}
