import React from 'react';

import {Link} from 'react-router-dom';

import localizator from 'localization/localizator';

import routes from 'constants/routes';

export default class LogInSpan extends React.Component {
  render() {
    return (
      <React.Fragment>
        <span>{localizator.translate(localizator.keys.components.home.logInPart1Text)}</span>
        <Link to={routes.pages.logIn} className="home-log-in-link">{localizator.translate(localizator.keys.components.home.logInLinkText)}</Link>
        <span>{localizator.translate(localizator.keys.components.home.logInPart2Text)}</span>
      </React.Fragment>
    );
  }
}
