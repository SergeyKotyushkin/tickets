import React from 'react';

import localizator from 'localization/localizator';

export default class LogOutLink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="app-header-menu-link-container">
          <span className="app-header-menu-username">{this.props.username}</span>
          <a href="javascript:void(0);" onClick={this.props.onLogOutClick}>
            {localizator.translate(localizator.keys.components.app.header.links.logOut)}
          </a>
        </div>
      </React.Fragment>
    );
  }
}
