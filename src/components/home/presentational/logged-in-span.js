import React from 'react';

import {Link} from 'react-router-dom';

import routes from 'constants/routes';

export default class LoggedInSpan extends React.Component {
  render() {
    return (
      <React.Fragment>
        <span>You are ready for your&nbsp;
          <Link to={routes.pages.tickets}>tickets</Link>
          &nbsp;statistics!</span>
      </React.Fragment>
    );
  }
}
