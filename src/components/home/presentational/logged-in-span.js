import React from 'react';

import {Link} from 'react-router-dom';

import labels from 'constants/labels';
import routes from 'constants/routes';

export default class LoggedInSpan extends React.Component {
  render() {
    return (
      <React.Fragment>
        <span>{labels.components.home.loggedInPart1Text}</span>
        <Link to={routes.pages.tickets} className="home-logged-in-tickets-link">{labels.components.home.loggedInTicketsLinkText}</Link>
        <span>{labels.components.home.loggedInPart2Text}</span>
      </React.Fragment>
    );
  }
}
