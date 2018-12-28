import React from 'react';

import DelimiterBlock from './delimiter-block';

import localizator from 'localization/localizator';

export default class LoadMoreBlock extends React.Component {
  render() {
    return this.props.isLoadMoreButtonVisible
      ? (
        <div className="tickets-load-more-container flex-container-column">
          <DelimiterBlock/>
          <div className="tickets-load-more-button-container">
            <button onClick={this.props.onLoadMoreClick}>{localizator.translate(localizator.keys.components.tickets.loadMoreButtonLabel)}</button>
          </div>
        </div>
      )
      : <React.Fragment/>;
  }
}
