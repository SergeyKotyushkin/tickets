import React, {Component} from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import * as authActions from 'stores/auth/actions';

import AuthService from 'services/auth';

import TicketService from 'services/ticket';
import TicketNumber from 'components/TicketNumber';

import routes from 'constants/routes';
import messages from 'constants/messages';

class Tickets extends Component {
  _from = 0;
  _size = 2;
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
        <div className="flex-container-column">
          <div className="tickets-container flex-container-row">
            {!!this.state.tickets.length && this._getTicketsMarkup()}
            {!this.state.tickets.length && this._getEmptyTicketsMarkup()}
          </div>
          {this.state.total > this.state.tickets.length && this._getLoadMoreMarkup()}
          <div>
            <hr/>
          </div>
          <div className="new-ticket-container flex-container-row">
            <div className="flex-container-column">
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

      let formattedNumber = this._fillLeftWithZero(tickets[i].number, 6);

      let x1 = (
        <div>
          <span>{formattedNumber}</span>
          <div className="flex-container-column">
            {ticketDatesMarkup}
          </div>
        </div>
      );

      ticketsMarkup.push(
        <div key={i} className="ticket">
          <div className="ticket-outer-container">
            <div className="ticket-inner-container flex-container-column">
              <span className="ticket-header-text-container">...</span>
              <span className="ticket-number-container">{formattedNumber}</span>
              <span className="ticket-bus-label-container">bus</span>
              <span className="ticket-ticket-label-container">ticket</span>
              <span className="ticket-price-container">...</span>
            </div>
          </div>
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

  _onTicketAdded(data) {
    if (this._handleError(data)) {
      return;
    }

    alert('added', data);
  }

  _onDigitChange(number) {
    this.setState({number});
  }

  _fillLeftWithZero(num, len) {
    return (Array(len).join("0") + num).slice(-len);
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
