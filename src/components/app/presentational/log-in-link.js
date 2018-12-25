import React from 'react';

import {Link} from 'react-router-dom';

import labels from 'constants/labels';
import routes from 'constants/routes';

export default class LogInLink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="app-header-menu-link-container">
          <Link to={routes.pages.logIn}>{labels.components.app.header.links.logIn}</Link>
        </div>
      </React.Fragment>
    );
  }
}
