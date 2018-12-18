import React, {Component} from 'react'

export default class Ticket extends Component {
  render() {
    return (
      <div className="ticket">
        {this.props.number === undefined && this._getEmptyMarkup()}
        {this.props.number === null && this._getNotFoundMarkup()}
        {!!(this.props.number === 0 || this.props.number) && this._getFoundMarkup()}
      </div>
    );
  }

  _getFoundMarkup() {
    let formattedNumber = this._fillLeftWithZero(this.props.number, 6);
    return (
      <div className="ticket-outer-container">
        <div className="ticket-inner-container flex-container-column">
          <span className="ticket-header-text-container">...</span>
          <span className="ticket-number-container">{formattedNumber}</span>
          <span className="ticket-bus-label-container">bus</span>
          <span className="ticket-ticket-label-container">ticket</span>
          <span className="ticket-price-container">...</span>
        </div>
      </div>
    );
  }

  _getEmptyMarkup() {
    return (<div></div>);
  }

  _getNotFoundMarkup() {
    return (<span>Not found</span>);
  }

  _fillLeftWithZero(num, len) {
    return (Array(len).join("0") + num).slice(-len);
  }
}
