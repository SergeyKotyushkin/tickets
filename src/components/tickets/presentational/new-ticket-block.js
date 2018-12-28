import React from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import TicketNumber from './ticket-number';

import localizator from 'localization/localizator';

export default class NewTicketBlock extends React.Component {
  render() {
    return (
      <div className="new-ticket-container flex-container-column">
        <div>
          <h3>{localizator.translate(localizator.keys.components.tickets.newTicket.title)}</h3>
        </div>
        <div className="new-ticket-number-container">
          <TicketNumber
            number={this.props.number}
            onDigitChange={this.props.onDigitChange}/>
        </div>
        <div className="new-ticket-date-container">
          <div>
            <label htmlFor="new-ticket-date__input">{localizator.translate(localizator.keys.components.tickets.newTicket.dateLabel)}</label>
          </div>
          <div>
            <DatePicker
              id="new-ticket-date__input"
              selected={this.props.date}
              dateFormat="dd.MM.yyyy"
              onChange={this.props.onDateChange}/>
          </div>
        </div>
        <div className="new-ticket-add-button-container">
          <button onClick={this.props.onAddNewTicketClick}>{
              localizator.translate(
                localizator.keys.components.tickets.newTicket.addButtonLabel
              )
            }</button>
        </div>
      </div>
    );
  }
}
