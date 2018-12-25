import React from 'react';

import {Link} from 'react-router-dom';

import labels from 'constants/labels';
import routes from 'constants/routes';

export default class LogInSpan extends React.Component {
  render() {
    return (
      <React.Fragment>
        <span>{labels.components.home.logInPart1Text}</span>
        <Link to={routes.pages.logIn} className="home-log-in-link">{labels.components.home.logInLinkText}</Link>
        <span>{labels.components.home.logInPart2Text}</span>
      </React.Fragment>
    );
  }
}
