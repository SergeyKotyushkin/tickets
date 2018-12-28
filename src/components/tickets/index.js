import React, {Component} from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';

import cloneDeep from 'clone-deep';

import * as authActions from 'stores/auth/actions';
import * as alertModalActions from 'stores/alert-modal/actions';
import * as confirmModalActions from 'stores/confirm-modal/actions';

import AlertModalService from 'services/alert-modal';
import ConfirmModalService from 'services/confirm-modal';
import AuthService from 'services/auth';
import TicketService from 'services/ticket';

import TicketsList from './presentational/tickets-list';
import LoadMoreBlock from './presentational/load-more-block';
import TotalBlock from './presentational/total-block';
import NewTicketBlock from './presentational/new-ticket-block';
import SearchTicketBlock from './presentational/search-ticket-block';
import DelimiterBlock from './presentational/delimiter-block';
import LoadingBlock from './presentational/loading-block';

import localizator from 'localization/localizator';

import badRequestTypes from 'constants/bad-request-types';
import modalTypes from 'constants/modal-types';
import routes from 'constants/routes';
import storageKeys from 'constants/storageKeys';
import statusCodes from 'constants/statusCodes';

import 'static/css/tickets.css';

class Tickets extends Component {
  _from = 0;
  _size = 10;

  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: this.props.authStore.isAuthenticated,
      tickets: [],
      total: 0,
      newTicket: {
        number: 0,
        date: null
      },
      searchTicket: {
        numberForSearch: 0,
        foundNumber: undefined,
        foundDates: undefined
      }
    };

    this._alertModalService = new AlertModalService(
      props.dispatchedAlertModalActions
    );
    this._authService = new AuthService(props.dispatchedAuthActions);
    this._confirmModalService = new ConfirmModalService(
      props.dispatchedConfirmModalActions
    );
    this._ticketService = new TicketService();

    this.onNewTicketDigitChange = this._onNewTicketDigitChange.bind(this);
    this.onNewTicketDateChange = this._onNewTicketDateChange.bind(this);
    this.onSearchInputChange = this._onSearchInputChange.bind(this);
    this.onAddNewTicketClick = this._onAddNewTicketClick.bind(this);
    this.onSearchNumberClick = this._onSearchNumberClick.bind(this);
    this.onLoadMoreClick = this._onLoadMoreClick.bind(this);

    this.onDeleteTicketDateCallback = this._onDeleteTicketDateCallback.bind(this);
    this.onDeleteTicketCallback = this._onDeleteTicketCallback.bind(this);
  }

  componentDidMount() {
    if (this.props.authStore.isAuthenticated) {
      this._loadNextTickets();
      return;
    }

    if (localStorage.getItem(storageKeys.auth)) {
      this._authService.tryLogIn(
        this._onTryLogInSuccess.bind(this),
        this._handleError.bind(this)
      );
      return;
    }

    this.props.history.push(routes.logIn);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.authStore.isAuthenticated && !this.props.authStore.isAuthenticated) {
      this.props.history.push(routes.logIn);
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
            : <LoadingBlock/>
        }
      </React.Fragment>
    );
  }

  // markups
  _getAuthenticatedMarkup() {
    return (
      <div className="tickets-content">
        <h2>{localizator.translate(localizator.keys.components.tickets.title)}</h2>
        <div className="flex-container-column">
          <div className="tickets-container flex-container-row">
            <TicketsList
              readonly={false}
              tickets={this.state.tickets}
              onDeleteTicketDateCallback={this.onDeleteTicketDateCallback}
              onDeleteTicketCallback={this.onDeleteTicketCallback}/>
          </div>
          <LoadMoreBlock
            isLoadMoreButtonVisible={this.state.total > this.state.tickets.length}
            onLoadMoreClick={this.onLoadMoreClick}/>
          <TotalBlock total={this.state.total}/>
          <DelimiterBlock/>
          <div className="ticket-actions-container flex-container-row">
            <NewTicketBlock
              number={this.state.newTicket.number}
              date={this.state.newTicket.date}
              onDigitChange={this.onNewTicketDigitChange}
              onDateChange={this.onNewTicketDateChange}
              onAddNewTicketClick={this.onAddNewTicketClick}/>
            <SearchTicketBlock
              readonly={false}
              searchNumber={this.state.searchTicket.numberForSearch}
              foundNumber={this.state.searchTicket.foundNumber}
              foundDates={this.state.searchTicket.foundDates}
              onSearchInputChange={this.onSearchInputChange}
              onSearchNumberClick={this.onSearchNumberClick}
              onDeleteTicketDateCallback={this.onDeleteTicketDateCallback}
              onDeleteTicketCallback={this.onDeleteTicketCallback}/>
          </div>
          <DelimiterBlock/>
        </div>
      </div>
    );
  }

  // local
  _loadNextTickets() {
    this._ticketService.getMany(
      this._from,
      this._size,
      this._onLoadNextTicketsSuccess.bind(this),
      this._handleError.bind(this)
    );
  }

  // onChange handlers
  _onNewTicketDigitChange(number) {
    const newState = cloneDeep(this.state);
    newState.newTicket.number = number;
    this.setState(newState);
  }

  _onNewTicketDateChange(date) {
    let adjustedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    const newState = cloneDeep(this.state);
    newState.newTicket.date = adjustedDate;
    this.setState(newState);
  }

  _onSearchInputChange(event) {
    const newState = cloneDeep(this.state);
    newState.searchTicket.numberForSearch = event.target.value;
    this.setState(newState);
  }

  // onClick handlers
  _onAddNewTicketClick() {
    this._confirmModalService.open(
      modalTypes.attention,
      localizator.translate(localizator.keys.components.app.confirmModal.attentionLabel),
      localizator.translate(localizator.keys.messages.tickets.addTicketConfirm),
      this._onAddNewTicketConfirmYes.bind(this)
    );
  }

  _onSearchNumberClick() {
    this._ticketService.find(
      this.state.searchTicket.numberForSearch,
      this._onSearchNumberSuccess.bind(this),
      this._handleError.bind(this)
    );
  }

  _onLoadMoreClick() {
    this._loadNextTickets();
  }

  // ticket service callbacks
  _onAddTicketSuccess() {
    this._reloadTickets();
  }

  _onSearchNumberSuccess(data) {
    const newState = cloneDeep(this.state);
    newState.searchTicket.foundNumber = data.ticket
      ? data.ticket.number
      : null;
    newState.searchTicket.foundDates = data.ticket
      ? data.ticket.dates
      : null;
    this.setState(newState);
  }

  _onLoadNextTicketsSuccess(data) {
    let tickets = cloneDeep(this.state.tickets);
    data.tickets.forEach(function(ticket) {
      tickets.push(ticket);
    });

    this._from = tickets.length;
    this.setState({tickets, total: data.total});
  }

  _onDeleteTicketDateCallback(number, date) {
    let tickets = cloneDeep(this.state.tickets).filter((ticket) => {
      if (ticket.number !== number) {
        return ticket;
      }

      this._deleteTicketDate(ticket, date);
      return ticket;
    }).filter(function(ticket) {
      return ticket.dates && ticket.dates.length;
    });

    if (this.state.tickets.length !== tickets.length) {
      this._reloadTickets();
    } else {
      this.setState({tickets});
    }
  }

  _onDeleteTicketCallback(number) {
    this._reloadTickets();
  }

  _onAddNewTicketConfirmYes() {
    if (!this.state.newTicket.date) {
      this._alertModalService.open(
        modalTypes.error,
        localizator.translate(localizator.keys.components.app.alertModal.errorLabel),
        localizator.translate(localizator.keys.messages.tickets.dateIsNotFilled)
      );
      return;
    }

    this._ticketService.add(
      this.state.newTicket.number,
      this.state.newTicket.date.toISOString(),
      this._onAddTicketSuccess.bind(this),
      this._handleError.bind(this)
    );
  }

  // auth service callbacks
  _onTryLogInSuccess(data) {
    this.setState({isAuthenticated: true});
  }

  // local
  _handleError(error) {
    let message = localizator.translate(
      localizator.keys.messages.common.internalServerError
    );
    switch (error.response.status) {
      case statusCodes.unauthenticated:
        message = localizator.translate(
          localizator.keys.messages.common.unauthenticated
        );
        break;
      case statusCodes.badRequest:
        switch (error.response.data.type) {
          case badRequestTypes.badData:
            message = localizator.translate(localizator.keys.messages.tickets.badData);
            break;
        }
        break;
    }

    this._alertModalService.open(
      modalTypes.error,
      localizator.translate(localizator.keys.components.app.alertModal.errorLabel),
      message
    );

    if (error.response.status === statusCodes.unauthenticated) {
      localStorage.removeItem(storageKeys.auth);
      this.props.dispatchedAuthActions.logOut();
    }
  }

  _deleteTicketDate(ticket, date) {
    for (var i = 0; i < ticket.dates.length; i++) {
      if (ticket.dates[i] === date) {
        ticket.dates.splice(i, 1);
        break;
      }
    }

    return ticket;
  }

  _reloadTickets() {
    this._from = 0;

    const newState = cloneDeep(this.state);
    newState.tickets = [];
    newState.total = 0;
    newState.newTicket.number = 0;
    newState.newTicket.date = null;
    this.setState(newState);
  }
}

export default connect(
  (state, ownProps) => ({authStore: state.auth}),
  (dispatch, ownProps) => ({
    dispatchedAuthActions: bindActionCreators(authActions, dispatch),
    dispatchedAlertModalActions: bindActionCreators(alertModalActions, dispatch),
    dispatchedConfirmModalActions: bindActionCreators(
      confirmModalActions,
      dispatch
    )
  })
)(Tickets);
