import React from 'react';

import Ticket from './ticket';

import {withI18n} from "react-i18next";
import Localizator from 'localization/localizator';

class SearchTicketBlock extends React.Component {
  render() {
    const {t} = this.props;

    let foundTicket = (
      <React.Fragment>
        {this.props.foundNumber === undefined && this._getEmptyMarkup()}
        {this.props.foundNumber === null && this._getNotFoundMarkup()}
        {(this.props.foundNumber === 0 || this.props.foundNumber) && this._getFoundMarkup()}
      </React.Fragment>
    )

    return (
      <div className="search-ticket-container flex-container-column">
        <div className="search-ticket-title-container">
          <h3>{t(Localizator.keys.components.tickets.searchTicket.title)}</h3>
        </div>
        <div className="search-ticket-input-container">
          <div>
            <label htmlFor="search-ticket__input">{t(Localizator.keys.components.tickets.searchTicket.numberLabel)}</label>
          </div>
          <div>
            <input
              type="number"
              id="search-ticket__input"
              value={this.props.searchNumber}
              onChange={this.props.onSearchInputChange}/>
          </div>
        </div>
        <div className="find-ticket-button-container">
          <button onClick={this.props.onSearchNumberClick}>{t(Localizator.keys.components.tickets.searchTicket.findButtonLabel)}</button>
        </div>
        <div className="found-ticket-container flex-container-row">
          {foundTicket}
        </div>
      </div>
    );
  }

  // markups
  _getEmptyMarkup() {
    return (<React.Fragment/>);
  }

  _getNotFoundMarkup() {
    const {t} = this.props;

    return (
      <span>{t(Localizator.keys.components.tickets.searchTicket.notFoundMessage)}</span>
    );
  }

  _getFoundMarkup() {
    return (
      <Ticket
        readonly={this.props.readonly}
        number={this.props.foundNumber}
        dates={this.props.foundDates}
        onDeleteTicketDateClick={this.props.onDeleteTicketDateClick}
        onDeleteTicketClick={this.props.onDeleteTicketClick}/>
    );
  }
}

export default withI18n()(SearchTicketBlock);
