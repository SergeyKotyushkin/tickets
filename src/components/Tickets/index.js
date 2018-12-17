import React, {Component} from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import * as authActions from 'stores/auth/actions';
import AuthService from 'services/auth';
import TicketService from 'services/ticket';

import TicketNumber from 'components/TicketNumber';

import messages from 'constants/messages';

class Tickets extends Component {
  _from = 0;
  _size = 50;
  _digits = [
    0,
    0,
    0,
    0,
    0,
    0
  ];

  constructor(props) {
    super(props);

    this._authService = new AuthService(props.dispatchedAuthActions);
    this._ticketService = new TicketService();

    this.state = {
      tickets: [],
      total: 0,
      number: 0,
      date: null
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
        <h2>Tickets</h2>
        <div className="flex-container-row">
          <div className="flex-container-column tickets-container">
            {!!this.state.tickets.length && this._getTicketsMarkup()}
            {!this.state.tickets.length && this._getEmptyTicketsMarkup()}
          </div>
          <div className="add-ticket-container">
            <div>
              <TicketNumber
                number={this.state.number}
                onDigitChange={(number) => this._onDigitChange(number)}></TicketNumber>
            </div>
            <div><DatePicker
              selected={this.state.date}
              onChange={(date) => this._onDateChange(date)}/></div>
            <div>
              <button onClick={() => this._onAddticketClick()}>Add</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  _getTicketsMarkup() {
    let tickets = this.state.tickets;

    let ticketsMarkup = [];
    for (var i = 0; i < tickets.length; i++) {
      let ticketDatesMarkup = [];
      for (var j = 0; j < tickets[i].dates.length; j++) {
        let date = new Date(tickets[i].dates[j]).toLocaleDateString();
        ticketDatesMarkup.push(<div key={j} className="ticket-number-date">{date}</div>);
      }

      ticketsMarkup.push(
        <div key={i} className="ticket-number">
          <span>Number:&nbsp;{this._fillLeftWithZero(tickets[i].number, 6)}</span>
          <div className="flex-container-column">
            {ticketDatesMarkup}
          </div>

        </div>
      );
    }
    return ticketsMarkup;
  }
  _getEmptyTicketsMarkup() {
    return <span>You don't have any ticket yet!</span>
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

    this.setState({tickets, total: data.total});
  }

  _onDateChange(date) {
    this.setState({date});
  }

  _onAddticketClick() {
    if (!this.state.date) {
      alert(messages.fillDate);
      return;
    }

    confirm(messages.addTicketConfirm) && this
      ._ticketService
      .add({number: this.state.number, date: this.state.date});
  }

  _onDigitChange(number) {
    this.setState({number});
  }

  _fillLeftWithZero(num, len) {
    return (Array(len).join("0") + num).slice(-len);
  }
}

export default connect(
  (state, ownProps) => ({authStore: state.auth}),
  (dispatch, ownProps) => ({
    dispatchedAuthActions: bindActionCreators(authActions, dispatch)
  })
)(Tickets);
