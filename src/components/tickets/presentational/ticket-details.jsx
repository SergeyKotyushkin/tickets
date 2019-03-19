import React from 'react';

import ReactModal from 'react-modal';
ReactModal.setAppElement('#root');

import Ticket from './ticket';
import TicketDetailsDates from './ticket-details-dates';

import localizator from 'localization/localizator';

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
        className="modal-content"
        isOpen={this.props.areTicketDetailsOpen && !this.props.readonly}
        onRequestClose={this.props.onCloseTicketDetailsClick}>
        <div className="ticket-details-modal-container flex-container-column">
          <div>
            <h3>{localizator.translate(localizator.keys.components.tickets.ticketDetails.title)}</h3>
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
          <div className="ticket-details-delete-ticket-button-container">
            <button onClick={this.props.onDeleteTicketClick}>{
                localizator.translate(
                  localizator.keys.components.tickets.ticketDetails.deleteTicketButtonLabel
                )
              }</button>
          </div>
          <div className="ticket-modal-close-button-container">
            <button onClick={this.props.onCloseTicketDetailsClick}>{
                localizator.translate(
                  localizator.keys.components.tickets.ticketDetails.closeTicketDetailsButtonLabel
                )
              }</button>
          </div>
        </div>
      </ReactModal>
    );
  }
}
