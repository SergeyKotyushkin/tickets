import React from 'react';

export default class LoggedInBlock extends React.Component {
  render() {
    return (
      <div className="login-title-container">
        <h2>{this.props.username}, you are already logged in!</h2>
      </div>
    );
  }
}
