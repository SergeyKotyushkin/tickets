import React from 'react'

import DelimiterBlock from './delimiter-block';

import labels from 'constants/labels';

export default class LoadMoreBlock extends React.Component {
  render() {
    return (
      <div className="tickets-total-container flex-container-column">
        <DelimiterBlock/>
        <div className="tickets-total-text-container">
          <div>
            <span className="tickets-total-label">{labels.components.tickets.totalLabel}</span>
            <span>{this.props.total}</span>
          </div>
        </div>
      </div>
    );
  }
}
