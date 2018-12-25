import React from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import TicketNumber from './ticket-number';

import {withI18n} from "react-i18next";
import Localizator from 'localization/localizator';

class NewTicketBlock extends React.Component {
  render() {
    const {t} = this.props;

    return (
      <div className="new-ticket-container flex-container-column">
        <div>
          <h3>{t(Localizator.keys.components.tickets.newTicket.title)}</h3>
        </div>
        <div className="new-ticket-number-container">
          <TicketNumber
            number={this.props.number}
            onDigitChange={this.props.onDigitChange}/>
        </div>
        <div className="new-ticket-date-container">
          <div>
            <label htmlFor="new-ticket-date__input">{t(Localizator.keys.components.tickets.newTicket.dateLabel)}</label>
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
          <button onClick={this.props.onAddNewTicketClick}>{t(Localizator.keys.components.tickets.newTicket.addButtonLabel)}</button>
        </div>
      </div>
    );
  }
}

export default withI18n()(NewTicketBlock);
