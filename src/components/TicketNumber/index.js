import React, {Component} from 'react'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';

import {browserHistory, withRouter} from "react-router-dom"

import routes from 'constants/routes';

import * as authActions from 'stores/auth/actions';
import AuthService from 'services/auth';

class TicketNumber extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: this.props.number
    };

    this._authService = new AuthService(props.dispatchedAuthActions);
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
    let digits = this._getDigitsFromNumber(this.state.number);
    for (var i = 0; i < 6; i++) {
      let value = digits && digits.length && digits[i] || 0;
      ticketNumber.push(
        <div className="ticket-digit-container" key={`ticket-digit-${i}`}>
          <div className="ticket-digit-button-top">
            <button data-top="true" onClick={(event) => this._onDigitChange(event)}>+</button>
          </div>
          <div className="ticket-digit" data-position={i} data-value={value}>{value}</div>
          <div className="ticket-digit-button-bottom">
            <button data-bottom="true" onClick={(event) => this._onDigitChange(event)}>-</button>
          </div>
        </div>
      );
    }

    return ticketNumber;
  }

  _redirectToLogin() {
    this
      .props
      .history
      .push(routes.logIn);
  }

  _onDigitChange(event) {
    const button = event.target || event.srcElement;

    const {digitNode, digitValue, digitPosition} = this._getDigitNodeInfo(button);
    let digitChangeValue = button.dataset.top
      ? 1
      : -1;
    let newDigitValue = digitValue + digitChangeValue;
    if (newDigitValue > 9) {
      newDigitValue = 9;
    }

    if (newDigitValue < 0) {
      newDigitValue = 0;
    }

    let mul = Math.pow(10, digitPosition);
    let digits = this._getDigitsFromNumber(this.state.number);
    digits[digitPosition] = newDigitValue;
    let number = this._getNumberFromDigits(digits);

    this.setState({number})
    this.props.onDigitChange && this
      .props
      .onDigitChange(number);
  }

  _getDigitNodeInfo(button) {
    const digitNode = button.dataset.top
      ? button.parentElement.nextSibling
      : button.parentElement.previousSibling;
    let digitValue = +digitNode.dataset.value;
    let digitPosition = +digitNode.dataset.position;

    return {digitNode, digitValue, digitPosition};
  }

  _getNumberFromDigits(digits) {
    let number = 0;
    let mul = 1;
    for (var i = 0; i < 6; i++) {
      number += digits[5 - i] * mul;
      mul *= 10;
    }

    return number;
  }

  _getDigitsFromNumber(number) {
    let digits = [];
    for (var i = 0; i < 6; i++) {
      digits[5 - i] = number % 10;
      number = Math.floor(number / 10);
    }

    return digits;
  }
}

export default withRouter(
  connect((state, ownProps) => ({authStore: state.auth}), (dispatch, ownProps) => ({
    dispatchedAuthActions: bindActionCreators(authActions, dispatch)
  }))(TicketNumber)
);
