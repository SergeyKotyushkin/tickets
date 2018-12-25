import React from 'react';

import labels from 'constants/labels';

export default class LoadingBlock extends React.Component {
  render() {
    return (
      <div className="tickets-content">
        <span>{labels.components.tickets.loadingMessage}</span>
      </div>
    );
  }
}
