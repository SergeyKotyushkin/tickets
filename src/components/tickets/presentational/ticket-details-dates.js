import React from 'react';

export default class TicketDetailsDates extends React.Component {
  render() {
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
            <button onClick={this.props.onDeleteTicketDateClick}>Delete</button>
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
}
