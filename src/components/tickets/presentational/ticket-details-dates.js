import React from 'react';

import {withI18n} from "react-i18next";
import Localizator from 'localization/localizator';

class TicketDetailsDates extends React.Component {
  render() {
    const {t} = this.props;

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
            <button onClick={this.props.onDeleteTicketDateClick}>{
                t(
                  Localizator.keys.components.tickets.ticketDetails.deleteTicketDateButtonLabel
                )
              }</button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex-container-column">
        <div>
          <strong>{t(Localizator.keys.components.tickets.ticketDetails.datesTitle)}</strong>
        </div>
        <div>{datesMarkups}</div>
      </div>
    );
  }
}

export default withI18n()(TicketDetailsDates);
