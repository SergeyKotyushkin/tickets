import React from 'react';

import Ticket from './ticket';

export default class SearchTicketBlock extends React.Component {
  render() {
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
          <h3>Search for a ticket:</h3>
        </div>
        <div className="search-ticket-input-container">
          <div>
            <label htmlFor="search-ticket__input">Ticket number:</label>
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
          <button onClick={this.props.onSearchNumberClick}>Find</button>
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
    return (<span>Not found</span>);
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
