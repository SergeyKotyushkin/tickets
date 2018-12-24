import React from 'react';

import {Link} from 'react-router-dom';

import routes from 'constants/routes';

export default class LogInSpan extends React.Component {
  render() {
    return (
      <React.Fragment>
        <span>You need to&nbsp;
          <Link to={routes.pages.logIn}>log in</Link>
          &nbsp;to start!</span>
      </React.Fragment>
    );
  }
}
