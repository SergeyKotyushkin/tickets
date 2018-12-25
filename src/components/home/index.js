import React from 'react';

import {connect} from 'react-redux';

import LogInSpan from './presentational/log-in-span';
import LoggedInSpan from './presentational/logged-in-span';

import labels from 'constants/labels';

class Home extends React.Component {
  render() {
    return (
      <div className="flex-container-column home-container">
        <div>
          <span>{labels.components.home.welcomeText}</span>
          <div className="home-additional-info">
            {this.props.authStore.isAuthenticated && <LoggedInSpan/>}
            {!this.props.authStore.isAuthenticated && <LogInSpan/>}
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state, ownProps) => ({authStore: state.auth}))(Home);
