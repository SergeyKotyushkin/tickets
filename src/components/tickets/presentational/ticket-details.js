import React from 'react';

import ReactModal from 'react-modal';
ReactModal.setAppElement('#root');

import Ticket from './ticket';
import TicketDetailsDates from './ticket-details-dates';

import labels from 'constants/labels';

export default class TicketDetails extends React.Component {
  render() {
    return (
      <React.Fragment>
        {!this.props.readonly && this._getReactModalMarkup()}
      </React.Fragment>
    );
  }

  // markups
  _getReactModalMarkup() {
    return (
      <ReactModal
        style={this._getModalStyles()}
        isOpen={this.props.areTicketDetailsOpen && !this.props.readonly}
        onRequestClose={this.props.onCloseTicketDetailsClick}>
        <div>
          <h3>{labels.components.tickets.ticketDetails.title}</h3>
        </div>
        <div className="ticket-details-container flex-container-row">
          <div className="ticket-details-ticket-container flex-container-row">
            <Ticket number={this.props.number} readonly={true}></Ticket>
          </div>
          <div className="ticket-details-dates-container">
            <TicketDetailsDates
              number={this.props.number}
              dates={this.props.dates}
              onDeleteTicketDateClick={this.props.onDeleteTicketDateClick}/>
          </div>
        </div>
        <div>
          <button onClick={this.props.onDeleteTicketClick}>{labels.components.tickets.ticketDetails.deleteTicketButtonLabel}</button>
        </div>
        <div className="ticket-modal-close-button-container">
          <button onClick={this.props.onCloseTicketDetailsClick}>{labels.components.tickets.ticketDetails.closeTicketDetailsButtonLabel}</button>
        </div>
      </ReactModal>
    );
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
}
