import React from 'react'

import DelimiterBlock from './delimiter-block';

export default class LoadMoreBlock extends React.Component {
  render() {
    return (
      <div className="tickets-total-container flex-container-column">
        <DelimiterBlock/>
        <div className="tickets-total-text-container">
          <div>
            <span>Total:&nbsp;{this.props.total}</span>
          </div>
        </div>
      </div>
    );
  }
}
