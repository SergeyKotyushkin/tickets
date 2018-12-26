import React from 'react';

import {Link} from 'react-router-dom';

import localizator from 'localization/localizator';

import routes from 'constants/routes';

export default class LogInLink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="app-header-menu-link-container">
          <Link to={routes.pages.logIn}>{localizator.translate(localizator.keys.components.app.header.links.logIn)}</Link>
        </div>
      </React.Fragment>
    );
  }
}
