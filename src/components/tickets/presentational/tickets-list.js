import React from 'react'

import Ticket from './ticket';

export default class TicketsList extends React.Component {
  render() {
    if (!this.props.tickets || !this.props.tickets.length) {
      return (<div>
        <span>You don't have any ticket yet!</span>
      </div>);
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
