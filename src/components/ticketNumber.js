import React, {Component} from 'react'

import TicketNumberService from 'services/ticket-number';

export default class TicketNumber extends Component {
  constructor(props) {
    super(props);

    this._ticketNumberService = new TicketNumberService();

    // markup methods
    this.onDigitChange = this._onDigitChange.bind(this);
  }

  render() {
    return (
      <div className="flex-container-row">
        {this._createTicketNumberMarkup()}
      </div>
    );
  }

  // markups
  _createTicketNumberMarkup() {
    let ticketNumber = [];
    let digits = this._ticketNumberService.getDigitsFromNumber(this.props.number);

    for (var i = 0; i < 6; i++) {
      let value = digits && digits.length && digits[i] || 0;
      ticketNumber.push(
        <div
          key={i}
          className="ticket-digit-container"
          data-position={i}
          data-value={value}>
          <div
            className="ticket-digit-button"
            data-top="true"
            onClick={this.onDigitChange}>
            <span>+</span>
          </div>
          <div className="ticket-digit">{value}</div>
          <div
            className="ticket-digit-button"
            data-bottom="true"
            onClick={this.onDigitChange}>
            <span>-</span>
          </div>
        </div>
      );
    }

    let newTicketMarkup = (
      <div className="ticket">
        <div className="ticket-outer-container">
          <div className="ticket-inner-container flex-container-column">
            <span className="ticket-header-text-container">...</span>
            <div className="ticket-number-container flex-container-row">
              {ticketNumber}
            </div>
            <span className="ticket-bus-label-container">bus</span>
            <span className="ticket-ticket-label-container">ticket</span>
            <span className="ticket-price-container">...</span>
          </div>
        </div>
      </div>
    );

    return newTicketMarkup;
  }

  // onChange handlers
  _onDigitChange(event) {
    const button = event.currentTarget;

    const digitValue = +button.parentElement.dataset.value || 0;
    const digitPosition = +button.parentElement.dataset.position || 0;

    let digitChangeValue = button.dataset.top
      ? 1
      : -1;
    let newDigitValue = digitValue + digitChangeValue;
    if (newDigitValue > 9) {
      newDigitValue = 0;
    }

    if (newDigitValue < 0) {
      newDigitValue = 9;
    }

    let mul = Math.pow(10, digitPosition);
    let digits = this._ticketNumberService.getDigitsFromNumber(this.props.number);
    digits[digitPosition] = newDigitValue;
    let number = this._ticketNumberService.getNumberFromDigits(digits);

    this.setState({number});
    this.props.onDigitChange && this.props.onDigitChange(number);
  }
}
