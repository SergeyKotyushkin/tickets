import React, {Component} from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';

import * as authActions from 'stores/auth/actions';
import AuthService from 'services/auth';
import TicketService from 'services/ticket';

import TicketNumber from 'components/TicketNumber';

import messages from 'constants/messages';

class Tickets extends Component {
  _from = 0;
  _size = 50;

  constructor(props) {
    super(props);

    this._authService = new AuthService(props.dispatchedAuthActions);
    this._ticketService = new TicketService();

    this.state = {
      tickets: [],
      total: 0
    };
  }

  componentDidMount() {
    this
      ._authService
      .tryLogIn(this._loadComponentData.bind(this));
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.authStore.isLoggedIn && !this.props.authStore.isLoggedIn) {
      this._redirectToLogin();
    }
  }

  render() {
    return (
      <div>
        <h2>_Tickets_</h2>
        <div className="flex-container-column tickets-container">
          {this._getTicketsMarkup()}
        </div>
        <TicketNumber></TicketNumber>
      </div>
    );
  }

  _getTicketsMarkup() {
    let tickets = this.state.tickets;

    for (var i = 0; i < tickets.length; i++) {
      <div key={i}>
        <span>Number:&nbsp;{number}</span>
      </div>
    }
  }

  _loadComponentData() {
    this
      ._ticketService
      .getMany(
        this._from,
        this._size,
        this._onGetTicketsSuccess.bind(this),
        () => console.log(messages.internalServerError)
      );
  }

  _redirectToLogin() {
    this
      .props
      .history
      .push(routes.logIn);
  }

  _onGetTicketsSuccess(data) {
    if (data.error) {
      if (data.unauthenticated) {
        this._redirectToLogin();
        return;
      }

      alert(messages.internalServerError);
      return;
    }

    let tickets = JSON.parse(JSON.stringify(this.state.tickets));
    data
      .tickets
      .forEach(function(ticket) {
        tickets.push(ticket);
      });

    this.setState({tickets, total});
  }
}

export default connect(
  (state, ownProps) => ({authStore: state.auth}),
  (dispatch, ownProps) => ({
    dispatchedAuthActions: bindActionCreators(authActions, dispatch)
  })
)(Tickets);
