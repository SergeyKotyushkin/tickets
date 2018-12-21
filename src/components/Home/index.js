import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Link} from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div className="flex-container-column home-container">
        <div>
          <span>Now you can store your bus tickets!</span>
          {this.props.authStore.isAuthenticated && this._getTicketsLinkMarkup()}
          {!this.props.authStore.isAuthenticated && this._getLogInLinkMarkup()}
        </div>
      </div>
    );
  }

  // markups
  _getTicketsLinkMarkup() {
    return (
      <div className="home-additional-info">
        <span>You are ready for your&nbsp;
          <Link to="/tickets">tickets</Link>
          &nbsp;statistics!</span>
      </div>
    );
  }

  _getLogInLinkMarkup() {
    return (
      <div className="home-additional-info">
        <span>You need to&nbsp;
          <Link to="/login">log in</Link>
          &nbsp;to start!</span>
      </div>
    );
  }
}

export default connect((state, ownProps) => ({authStore: state.auth}))(Home);
