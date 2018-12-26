import React from 'react'

import DelimiterBlock from './delimiter-block';

import localizator from 'localization/localizator';

export default class TotalBlock extends React.Component {
  render() {
    return (
      <div className="tickets-total-container flex-container-column">
        <DelimiterBlock/>
        <div className="tickets-total-text-container">
          <div>
            <span className="tickets-total-label">{localizator.translate(localizator.keys.components.tickets.totalLabel)}</span>
            <span>{this.props.total}</span>
          </div>
        </div>
      </div>
    );
  }
}
