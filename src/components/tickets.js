import React, {Component} from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import * as authActions from 'stores/auth/actions';

import AuthService from 'services/auth';
import RouteService from 'services/route';
import TicketService from 'services/ticket';

import Ticket from 'components/ticket';
import TicketNumber from 'components/ticketNumber';

import authConstants from 'constants/auth';
import messages from 'constants/messages';
import statusCodes from 'constants/statusCodes';

class Tickets extends Component {
  _from = 0;
  _size = 10;

  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: this.props.authStore.isAuthenticated,
      tickets: [],
      total: 0,
      number: 0,
      date: null,
      foundNumber: undefined,
      foundDates: undefined,
      searchNumber: 0
    };

    this._authService = new AuthService(props.dispatchedAuthActions);
    this._routeService = new RouteService();
    this._ticketService = new TicketService();

    this.onDigitChange = this._onTicketNumberDigitChange.bind(this);
    this.onDateChange = this._onNewTicketDateChange.bind(this);
    this.onSearchInputChange = this._onSearchInputChange.bind(this);
    this.onAddTicketClick = this._onAddTicketClick.bind(this);
    this.onSearchNumberClick = this._onSearchNumberClick.bind(this);
    this.onLoadMoreClick = this._onLoadMoreClick.bind(this);
  }

  componentDidMount() {
    if (this.props.authStore.isAuthenticated) {
      this._loadNextTickets();
      return;
    }

    if (localStorage.getItem(authConstants.keyInStorage)) {
      this._authService.tryLogIn(
        this._onTryLogInSuccess.bind(this),
        this._handleError.bind(this)
      );
      return;
    }

    this._routeService.redirectToLogin(this.props.history);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.authStore.isAuthenticated && !this.props.authStore.isAuthenticated) {
      this._routeService.redirectToLogin(this.props.history);
      return;
    }

    if (!prevProps.authStore.isAuthenticated && this.props.authStore.isAuthenticated) {
      this._loadNextTickets();
      return;
    }

    if (prevState.total > 0 && !this.state.total) {
      this._loadNextTickets();
      return;
    }
  }

  render() {
    return (
      <React.Fragment>
        {
          this.state.isAuthenticated
            ? this._getAuthenticatedMarkup()
            : this._getLoadingMarkup()
        }
      </React.Fragment>
    );
  }

  // markups
  _getAuthenticatedMarkup() {
    return (
      <div className="tickets-content">
        <h2>Tickets</h2 >
        <div className="flex-container-column">
          <div className="tickets-container flex-container-row">
            {!!this.state.tickets.length && this._getTicketsMarkup()}
            {!this.state.tickets.length && this._getEmptyTicketsMarkup()}
          </div>
          {this.state.total > this.state.tickets.length && this._getLoadMoreMarkup()}
          {this._getTotalMarkup()}
          <div >
            <hr/>
          </div>
          <div className="ticket-actions-container flex-container-row">
            <div className="new-ticket-container flex-container-column">
              <div>
                <h3>Add new ticket here:</h3>
              </div>
              <div className="new-ticket-number-container">
                <TicketNumber number={this.state.number} onDigitChange={this.onDigitChange}/>
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
                    onChange={this.onDateChange}/>
                </div>
              </div>
              <div className="new-ticket-add-button-container">
                <button onClick={this.onAddTicketClick}>Add</button>
              </div>
            </div>
            <div className="search-ticket-container flex-container-column">
              <div className="search-ticket-title-container">
                <h3>Search for a ticket:</h3>
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
                    onChange={this.onSearchInputChange}/>
                </div>
              </div>
              <div className="find-ticket-button-container">
                <button onClick={this.onSearchNumberClick}>Find</button>
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

  _getLoadingMarkup() {
    return (
      <div className="tickets-content">
        <span>loading...</span>
      </div>
    );
  }

  _getTicketsMarkup() {
    let tickets = JSON.parse(JSON.stringify(this.state.tickets));
    tickets.sort(function(x, y) {
      return x.number - y.number;
    });

    let ticketsMarkups = [];
    for (var i = 0; i < tickets.length; i++) {
      ticketsMarkups.push(
        <div key={i}>
          <Ticket number={tickets[i].number} dates={tickets[i].dates}/>
        </div>
      );
    }

    return ticketsMarkups;
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
          <button onClick={this.onLoadMoreClick}>Load more</button>
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

  _loadNextTickets() {
    this._ticketService.getMany(
      this._from,
      this._size,
      this._onLoadNextTicketsSuccess.bind(this),
      this._handleError.bind(this)
    );
  }

  // onChange handlers
  _onTicketNumberDigitChange(number) {
    this.setState({number});
  }

  _onNewTicketDateChange(date) {
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

  // onClick handlers
  _onAddTicketClick() {
    if (!confirm(messages.tickets.addTicketConfirm)) {
      return;
    }

    if (!this.state.date) {
      alert(messages.tickets.dateIsNotFilled);
      return;
    }

    this._ticketService.add(
      this.state.number,
      this.state.date,
      this._onAddTicketSuccess.bind(this),
      this._handleError.bind(this)
    );
  }

  _onSearchNumberClick() {
    this._ticketService.find(
      this.state.searchNumber,
      this._onSearchNumberSuccess.bind(this),
      this._handleError.bind(this)
    );
  }

  _onLoadMoreClick() {
    this._loadNextTickets();
  }

  // ticket service callbacks
  _onAddTicketSuccess(data) {
    this._from = 0;
    this.setState({tickets: [], total: 0, number: 0, date: null});
  }

  _onSearchNumberSuccess(data) {
    this.setState({
      foundNumber: data.ticket
        ? data.ticket.number
        : null,
      foundDates: data.ticket
        ? data.ticket.dates
        : null
    });
  }

  _onLoadNextTicketsSuccess(data) {
    let tickets = JSON.parse(JSON.stringify(this.state.tickets));
    data.tickets.forEach(function(ticket) {
      tickets.push(ticket);
    });

    this._from = tickets.length;
    this.setState({tickets, total: data.total});
  }

  // auth service callbacks
  _onTryLogInSuccess(data) {
    this.setState({isAuthenticated: true});
  }

  // local
  _handleError(error) {
    const message = error.response.status === statusCodes.unauthenticated
      ? messages.common.unauthenticated
      : messages.common.internalServerError

    alert(message);

    if (error.response.status === statusCodes.unauthenticated) {
      this._routeService.redirectToLogin(this.props.history);
    }
  }
}

export default connect(
  (state, ownProps) => ({authStore: state.auth}),
  (dispatch, ownProps) => ({
    dispatchedAuthActions: bindActionCreators(authActions, dispatch)
  })
)(Tickets);
