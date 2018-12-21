import React from 'react'

import ReactModal from 'react-modal';
ReactModal.setAppElement('#root');

import TicketService from 'services/ticket';
import RouteService from 'services/route';

import messages from 'constants/messages';

export default class Ticket extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };

    this._ticketService = new TicketService();
    this._routeService = new RouteService();

    this.onOpenTicketClick = this._onOpenTicketClick.bind(this);
    this.onCloseTicketClick = this._onCloseTicketClick.bind(this);
    this.onDeleteDateClick = this._onDeleteDateClick.bind(this);
    this.onDeleteTicketClick = this._onDeleteTicketClick.bind(this);
  }

  render() {
    return (
      <div className="ticket" onClick={this.onOpenTicketClick}>
        {this.props.number === undefined && this._getEmptyMarkup()}
        {this.props.number === null && this._getNotFoundMarkup()}
        {(this.props.number === 0 || this.props.number) && this._getFoundMarkup()}
        {!this.props.readonly && this._getReactModalMarkup()}
      </div>
    );
  }

  // markups
  _getFoundMarkup() {
    let formattedNumber = this._fillLeftWithZero(this.props.number, 6);
    return (
      <div className="ticket-outer-container">
        <div className="ticket-inner-container flex-container-column">
          <span className="ticket-header-text-container">...</span>
          <span className="ticket-number-container">{formattedNumber}</span>
          <span className="ticket-bus-label-container">bus</span>
          <span className="ticket-ticket-label-container">ticket</span>
          <span className="ticket-price-container">...</span>
        </div>
      </div>
    );
  }

  _getEmptyMarkup() {
    return (<div></div>);
  }

  _getNotFoundMarkup() {
    return (<span>Not found</span>);
  }

  _getReactModalMarkup() {
    return (
      <ReactModal
        style={this._getModalStyles()}
        isOpen={this.state.modalIsOpen && !this.props.readonly}
        onRequestClose={this.onCloseTicketClick}>
        <div>
          <h3>Ticket details</h3>
        </div>
        <div className="ticket-details-container flex-container-row">
          <div className="ticket-details-ticket-container flex-container-row">
            <Ticket number={this.props.number} readonly={true}></Ticket>
          </div>
          <div className="ticket-details-dates-container">
            {this._getDatesMarkup()}
          </div>
        </div>
        <div>
          <button onClick={this.onDeleteTicketClick}>Delete ticket</button>
        </div>
        <div className="ticket-modal-close-button-container">
          <button onClick={this.onCloseTicketClick}>Close</button>
        </div>
      </ReactModal>
    );
  }

  _getDatesMarkup() {
    let datesMarkups = [];
    if (!this.props.dates) {
      return (<div className="flex-container-column"></div>);
    }

    let sortedDates = [...this.props.dates].sort(
      (x, y) => (new Date(x)).getTime() - (new Date(y)).getTime()
    );

    for (let i = 0; i < sortedDates.length; i++) {
      let date = new Date(sortedDates[i]).toLocaleDateString();
      datesMarkups.push(
        <div key={i} className="ticket-details-date-container flex-container-row">
          <div
            className="ticket-details-date"
            data-number={this.props.number}
            data-date={sortedDates[i]}>{date}</div>
          <div>
            <button onClick={this.onDeleteDateClick}>Delete</button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex-container-column">
        <div>
          <strong>Dates</strong>
        </div>
        <div>{datesMarkups}</div>
      </div>
    );
  }

  // onClick handlers
  _onOpenTicketClick(event) {
    event.stopPropagation();

    if (this.props.readonly) {
      return;
    }

    this.setState({modalIsOpen: true});
  }

  _onCloseTicketClick(event) {
    event.stopPropagation();

    this.setState({modalIsOpen: false});
  }

  _onDeleteDateClick(event) {
    if (!confirm(messages.deleteTicketDateConfirm)) {
      return;
    }

    let button = event.target || event.srcElement;
    let dateNode = button.parentElement.previousSibling;

    this._ticketService.deleteDate(
      this.props.number,
      dateNode.dataset.date,
      this._onDeleteDateSuccess.bind(this),
      this._handleError.bind(this)
    );
  }

  _onDeleteTicketClick(event) {
    if (!confirm(messages.deleteTicketConfirm)) {
      return;
    }

    this._ticketService.deleteTicket(
      this.props.number,
      this._onDeleteTicketSuccess.bind(this),
      this._handleError.bind(this)
    );
  }

  // ticket service callbacks
  _onDeleteDateSuccess() {
    this.setState({modalIsOpen: false});
  }

  _onDeleteTicketSuccess() {
    this.setState({modalIsOpen: false});
  }

  // react modal styles
  _getModalStyles() {
    let styles = {
      content: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        maxWidth: '400px',
        maxHeight: '500px',
        position: 'relative',
        top: '50%',
        transform: 'translateY(-50%)',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column'
      }
    };

    return styles;
  }

  // local
  _fillLeftWithZero(num, len) {
    return (Array(len).join("0") + num).slice(-len);
  }

  _handleError(error) {
    if (error.response.status === statusCodes.unauthenticated) {
      this._routeService.redirectToLogin(this.props.history);
      return;
    }

    alert(messages.internalServerError);
  }
}
