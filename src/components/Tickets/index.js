import React, {Component} from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import * as authActions from 'stores/auth/actions';

import AuthService from 'services/auth';

import TicketService from 'services/ticket';
import Ticket from 'components/Ticket';
import TicketNumber from 'components/TicketNumber';

import routes from 'constants/routes';
import messages from 'constants/messages';

class Tickets extends Component {
  _from = 0;
  _size = 10;
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

    this.state = {
      tickets: [],
      total: 0,
      number: 0,
      date: null,
      foundNumber: undefined,
      foundDates: undefined,
      searchNumber: 0
    };

    this._authService = new AuthService(props.dispatchedAuthActions);
    this._ticketService = new TicketService();
  }

  componentDidMount() {
    this
      ._authService
      .tryLogIn(this._loadComponentData.bind(this));
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.authStore.isLoggedIn && !this.props.authStore.isLoggedIn) {
      this._redirectToLogin();
      return;
    }

    if (prevState.total > 0 && !this.state.total) {
      this._loadNextTickets();
      return;
    }
  }

  render() {
    return (
      <div className="tickets-content">
        <h2>Tickets</h2>
        <div className="flex-container-column">
          <div className="tickets-container flex-container-row">
            {!!this.state.tickets.length && this._getTicketsMarkup()}
            {!this.state.tickets.length && this._getEmptyTicketsMarkup()}
          </div>
          {this.state.total > this.state.tickets.length && this._getLoadMoreMarkup()}
          {this._getTotalMarkup()}
          <div>
            <hr/>
          </div>
          <div className="ticket-actions-container flex-container-row">
            <div className="new-ticket-container flex-container-column">
              <div>
                <h2>Add new ticket here:</h2>
              </div>
              <div className="new-ticket-number-container">
                <TicketNumber
                  number={this.state.number}
                  onDigitChange={(number) => this._onDigitChange(number)}></TicketNumber>
              </div>
              <div className="new-ticket-date-container">
                <div>
                  <label htmlFor="new-ticket-date__input">Date:&nbsp;</label>
                </div>
                <div>
                  <DatePicker
                    id="new-ticket-date__input"
                    selected={this.state.date}
                    dateFormat="dd.MM.yyyy"
                    onChange={(date) => this._onDateChange(date)}></DatePicker>
                </div>
              </div>
              <div className="new-ticket-add-button-container">
                <button onClick={() => this._onAddTicketClick()}>Add</button>
              </div>
            </div>
            <div className="search-ticket-container flex-container-column">
              <div className="search-ticket-title-container">
                <h2>Search for a ticket:</h2>
              </div>
              <div className="search-ticket-input-container">
                <div>
                  <label htmlFor="search-ticket__input">Ticket number:</label>
                </div>
                <div>
                  <input
                    type="number"
                    id="search-ticket__input"
                    value={this.state.searchNumber}
                    onChange={(event) => this._onSearchInputChange(event)}/>
                </div>
              </div>
              <div className="find-ticket-button-container">
                <button onClick={(event) => this._onSearchNumberClick(event)}>Find</button>
              </div>
              <div className="found-ticket-container flex-container-row">
                <Ticket number={this.state.foundNumber} dates={this.state.foundDates}/>
              </div>
            </div>
          </div>
          <div>
            <hr/>
          </div>
        </div>
      </div>
    );
  }

  _getTicketsMarkup() {
    let tickets = JSON.parse(JSON.stringify(this.state.tickets));
    tickets.sort(function(x, y) {
      return x.number - y.number;
    });

    let ticketsMarkup = [];
    for (var i = 0; i < tickets.length; i++) {
      let ticketDatesMarkup = [];
      for (var j = 0; j < tickets[i].dates.length; j++) {
        let date = new Date(tickets[i].dates[j]).toLocaleDateString();
        ticketDatesMarkup.push(
          <div key={j} className="flex-container-row">
            <div
              className="ticket-number-date"
              data-number={tickets[i].number}
              data-date={tickets[i].dates[j]}>{date}</div>
            <button onClick={(event) => this._onDateDelete(event)}>&times;</button>
          </div>
        );
      }

      let x1 = (
        <div>
          <span>{tickets[i].number}</span>
          <div className="flex-container-column">
            {ticketDatesMarkup}
          </div>
        </div>
      );

      ticketsMarkup.push(
        <div key={i}>
          <Ticket number={tickets[i].number} dates={tickets[i].dates}/>
        </div>
      );
    }

    return ticketsMarkup;
  }

  _getEmptyTicketsMarkup() {
    return (<div>
      <span>You don't have any ticket yet!</span>
    </div>);
  }

  _getLoadMoreMarkup() {
    return (
      <div className="tickets-load-more-container flex-container-column">
        <div><hr/></div>
        <div className="tickets-load-more-button-container">
          <button onClick={() => this._loadNextTickets()}>Load more</button>
        </div>
      </div>
    );
  }

  _getTotalMarkup() {
    return (
      <div className="tickets-total-container flex-container-column">
        <div><hr/></div>
        <div className="tickets-total-text-container">
          <div>
            <span>Total:&nbsp;{this.state.total}</span>
          </div>
        </div>
      </div>
    );
  }

  _loadComponentData() {
    this._loadNextTickets();
  }

  _loadNextTickets() {
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
    if (this._handleError(data)) {
      return;
    }

    let tickets = JSON.parse(JSON.stringify(this.state.tickets));
    data
      .tickets
      .forEach(function(ticket) {
        tickets.push(ticket);
      });

    this._from = tickets.length;
    this.setState({tickets, total: data.total});
  }

  _onDateChange(date) {
    let adjustedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    this.setState({date: adjustedDate});
  }

  _onSearchInputChange(event) {
    this.setState({searchNumber: event.target.value});
  }

  _onAddTicketClick() {
    if (!confirm(messages.addTicketConfirm)) {
      return;
    }

    if (!this.state.date) {
      alert(messages.fillDate);
      return;
    }

    this
      ._ticketService
      .add({
        number: this.state.number,
        date: this.state.date
      }, this._onTicketAdded.bind(this), () => alert(messages.internalServerError));
  }

  _onDateDelete(event) {
    if (!confirm(messages.deleteTicketDateConfirm)) {
      return;
    }

    let button = event.target || event.srcElement;

    let dateNode = button.previousSibling;

    this
      ._ticketService
      .deleteDate({number: dateNode.dataset.number, date: dateNode.dataset.date});
  }

  _onSearchNumberClick() {
    this
      ._ticketService
      .find({
        number: this.state.searchNumber
      }, this._onTicketFound.bind(this), () => alert(messages.internalServerError));
  }

  _onTicketAdded(data) {
    if (this._handleError(data)) {
      return;
    }

    this._from = 0;
    this.setState({tickets: [], total: 0, number: 0, date: null});
  }

  _onTicketFound(data) {
    if (this._handleError(data)) {
      return;
    }

    this.setState({
      foundNumber: data.ticket
        ? data.ticket.number
        : null,
      foundDates: data.ticket
        ? data.ticket.dates
        : null
    });
  }

  _onDigitChange(number) {
    this.setState({number});
  }

  _handleError(data) {
    if (!data.error) {
      return false;
    }

    if (data.unauthenticated) {
      this._redirectToLogin();
      return true;
    }

    alert(messages.internalServerError);
    return true;
  }
}

export default connect(
  (state, ownProps) => ({authStore: state.auth}),
  (dispatch, ownProps) => ({
    dispatchedAuthActions: bindActionCreators(authActions, dispatch)
  })
)(Tickets);
