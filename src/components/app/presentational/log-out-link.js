import React from 'react';

import labels from 'constants/labels';

export default class LogOutLink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="app-header-menu-link-container">
          <a href="javascript:void(0);" onClick={this.props.onLogOutClick}>
            <span>{this.props.username}</span>
            <span className="app-header-menu-link-log-out-delimiter">{labels.components.app.header.links.logOutDelimiter}</span>
            <span>{labels.components.app.header.links.logOut}</span>
          </a>
        </div>
      </React.Fragment>
    );
  }
}
