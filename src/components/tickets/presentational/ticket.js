import React from 'react';

import TicketService from 'services/ticket';

import TicketDetails from './ticket-details';

import localizator from 'localization/localizator';

import messages from 'constants/messages';
import statusCodes from 'constants/statusCodes';

export default class Ticket extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      areTicketDetailsOpen: false
    };

    this._ticketService = new TicketService();

    this.onOpenTicketDetailsClick = this._onOpenTicketDetailsClick.bind(this);
    this.onCloseTicketDetailsClick = this._onCloseTicketDetailsClick.bind(this);
    this.onDeleteTicketDateClick = this._onDeleteTicketDateClick.bind(this);
    this.onDeleteTicketClick = this._onDeleteTicketClick.bind(this);
  }

  render() {
    let formattedNumber = this._fillLeftWithZero(this.props.number, 6);
    let hoverMessage = this.props.readonly || this.state.areTicketDetailsOpen
      ? ''
      : localizator.translate(
        localizator.keys.components.tickets.ticket.hoverMessage
      );
    return (
      <React.Fragment>
        <div
          className="ticket"
          onClick={this.onOpenTicketDetailsClick}
          title={hoverMessage}>
          <div className="ticket-outer-container">
            <div className="ticket-inner-container flex-container-column">
              <span className="ticket-header-text-container">{localizator.translate(localizator.keys.components.tickets.ticket.headerLabel)}</span>
              <span className="ticket-number-container">{formattedNumber}</span>
              <span className="ticket-bus-label-container">{localizator.translate(localizator.keys.components.tickets.ticket.busLabel)}</span>
              <span className="ticket-ticket-label-container">{localizator.translate(localizator.keys.components.tickets.ticket.ticketLabel)}</span>
              <span className="ticket-price-container">{localizator.translate(localizator.keys.components.tickets.ticket.priceLabel)}</span>
            </div>
          </div>
        </div>
        {
          !this.props.readonly && <TicketDetails
              areTicketDetailsOpen={this.state.areTicketDetailsOpen}
              readonly={this.props.readonly}
              number={this.props.number}
              dates={this.props.dates}
              onOpenTicketDetailsClick={this.onOpenTicketDetailsClick}
              onCloseTicketDetailsClick={this.onCloseTicketDetailsClick}
              onDeleteTicketDateClick={this.onDeleteTicketDateClick}
              onDeleteTicketClick={this.onDeleteTicketClick}/>
        }
      </React.Fragment>
    );
  }

  // onClick handlers
  _onOpenTicketDetailsClick(event) {
    event.stopPropagation();

    if (this.props.readonly) {
      return;
    }

    this.setState({areTicketDetailsOpen: true});
  }

  _onCloseTicketDetailsClick(event) {
    event.stopPropagation();

    this.setState({areTicketDetailsOpen: false});
  }

  _onDeleteTicketDateClick(event) {
    if (!confirm(messages.tickets.deleteTicketDateConfirm)) {
      return;
    }

    let button = event.target || event.srcElement;
    let dateNode = button.parentElement.previousSibling;

    this._ticketService.deleteDate(
      this.props.number,
      dateNode.dataset.date,
      this._onDeleteTicketDateSuccess.bind(this, this.props.number, dateNode.dataset.date),
      this._handleError.bind(this)
    );
  }

  _onDeleteTicketClick(event) {
    if (!confirm(messages.tickets.deleteTicketConfirm)) {
      return;
    }

    this._ticketService.deleteTicket(
      this.props.number,
      this._onDeleteTicketSuccess.bind(this, this.props.number),
      this._handleError.bind(this)
    );
  }

  // ticket service callbacks
  _onDeleteTicketDateSuccess(number, date) {
    if (this.props.dates && this.props.dates.length === 1) {
      this.setState({areTicketDetailsOpen: false});
    }

    this.props.onDeleteTicketDateCallback && this.props.onDeleteTicketDateCallback(
      number,
      date
    );
  }

  _onDeleteTicketSuccess(number) {
    this.setState({areTicketDetailsOpen: false});

    this.props.onDeleteTicketCallback && this.props.onDeleteTicketCallback(number);
  }

  // local
  _fillLeftWithZero(num, len) {
    return (Array(len).join('0') + num).slice(-len);
  }

  _handleError(error) {
    let message = null;
    switch (error.response.status) {
      case statusCodes.unauthenticated:
        message = messages.registration.unauthenticated;
        break;
      case statusCodes.badRequest:
        switch (error.response.type) {
          case badData:
            message = messages.tickets.badData;
            break;
        }
        break;
    }

    alert(message || messages.common.internalServerError);

    if (error.response.status === statusCodes.unauthenticated) {
      this._authService.dispatchedAuthActions.logOut();
      this._routeService.redirectToLogin(this.props.history);
    }
  }
}
