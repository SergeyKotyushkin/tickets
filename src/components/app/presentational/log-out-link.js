import React from 'react';

export default class LogOutLink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="app-header-menu-link-container">
          <a href="javascript:void(0);" onClick={this.props.onLogOutClick}>{this.props.username}&nbsp;|&nbsp;Log Out</a>
        </div>
      </React.Fragment>
    );
  }
}
