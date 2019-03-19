import React from 'react';

import {Link} from 'react-router-dom';

import routes from 'constants/routes';

import LogInSpan from './log-in-span';
import LoggedInSpan from './logged-in-span';

export default class AuthSpan extends React.Component {
  render() {
    return (
      this.props.isAuthenticated
        ? <LoggedInSpan/>
        : <LogInSpan/>
    );
  }
}
