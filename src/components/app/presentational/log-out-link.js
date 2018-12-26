import React from 'react';

import localizator from 'localization/localizator';

export default class LogOutLink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="app-header-menu-link-container">
          <a href="javascript:void(0);" onClick={this.props.onLogOutClick}>
            <span>{this.props.username}</span>
            <span className="app-header-menu-link-log-out-delimiter">{
                localizator.translate(
                  localizator.keys.components.app.header.links.logOutDelimiter
                )
              }</span>
            <span>{localizator.translate(localizator.keys.components.app.header.links.logOut)}</span>
          </a>
        </div>
      </React.Fragment>
    );
  }
}
