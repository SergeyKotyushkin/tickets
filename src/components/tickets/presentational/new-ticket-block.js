import React from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import TicketNumber from './ticket-number';

import labels from 'constants/labels';

export default class NewTicketBlock extends React.Component {
  render() {
    return (
      <div className="new-ticket-container flex-container-column">
        <div>
          <h3>{labels.components.tickets.newTicket.title}</h3>
        </div>
        <div className="new-ticket-number-container">
          <TicketNumber
            number={this.props.number}
            onDigitChange={this.props.onDigitChange}/>
        </div>
        <div className="new-ticket-date-container">
          <div>
            <label htmlFor="new-ticket-date__input">{labels.components.tickets.newTicket.dateLabel}</label>
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
          <button onClick={this.props.onAddNewTicketClick}>{labels.components.tickets.newTicket.addButtonLabel}</button>
        </div>
      </div>
    );
  }
}
