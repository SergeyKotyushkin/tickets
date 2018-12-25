import React from 'react'

import Ticket from './ticket';

import {withI18n} from "react-i18next";
import Localizator from 'localization/localizator';

class TicketsList extends React.Component {
  render() {
    const {t} = this.props;

    if (!this.props.tickets || !this.props.tickets.length) {
      return (
        <div>
          <span>{t(Localizator.keys.components.tickets.ticketsList.noTicketsMessage)}</span>
        </div>
      );
    }

    let tickets = this._adjustTickets(this.props.tickets);

    let ticketsMarkups = [];
    for (var i = 0; i < tickets.length; i++) {
      ticketsMarkups.push(
        <div key={i}>
          <Ticket
            readonly={this.props.readonly}
            number={tickets[i].number}
            dates={tickets[i].dates}
            onDeleteTicketDateCallback={this.props.onDeleteTicketDateCallback}
            onDeleteTicketCallback={this.props.onDeleteTicketCallback}/>
        </div>
      );
    }

    return ticketsMarkups;
  }

  _adjustTickets(inputTickets) {
    let tickets = JSON.parse(JSON.stringify(inputTickets));
    tickets.sort(function(x, y) {
      return x.number - y.number;
    });

    return tickets;
  }
}

export default withI18n()(TicketsList);
