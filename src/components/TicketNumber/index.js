import React, {Component} from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';

import {browserHistory, withRouter} from "react-router-dom"

import routes from 'constants/routes';

import * as authActions from 'stores/auth/actions';
import AuthService from 'services/auth';
import TicketNumberService from 'services/ticket-number';

class TicketNumber extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: this.props.number
    };

    this._authService = new AuthService(props.dispatchedAuthActions);
    this._ticketNumberService = new TicketNumberService();

    // markup methods
    this.onDigitChange = this
      ._onDigitChange
      .bind(this);
  }

  componentDidMount() {
    this
      ._authService
      .tryLogIn(null, this._redirectToLogin.bind(this));
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.authStore.isLoggedIn && !this.props.authStore.isLoggedIn) {
      this._redirectToLogin();
    }
  }

  render() {
    return (
      <div className="flex-container-row">
        {this._createTicketNumberMarkup()}
      </div>
    );
  }

  _createTicketNumberMarkup() {
    let ticketNumber = [];
    let digits = this
      ._ticketNumberService
      .getDigitsFromNumber(this.state.number);

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

  _redirectToLogin() {
    this
      .props
      .history
      .push(routes.logIn);
  }

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
    let digits = this
      ._ticketNumberService
      .getDigitsFromNumber(this.state.number);
    digits[digitPosition] = newDigitValue;
    let number = this
      ._ticketNumberService
      .getNumberFromDigits(digits);

    this.setState({number})
    this.props.onDigitChange && this
      .props
      .onDigitChange(number);
  }
}

export default withRouter(
  connect((state, ownProps) => ({authStore: state.auth}), (dispatch, ownProps) => ({
    dispatchedAuthActions: bindActionCreators(authActions, dispatch)
  }))(TicketNumber)
);
