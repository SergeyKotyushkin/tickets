import React from 'react';

import localizator from 'localization/localizator';

export default class LoadingBlock extends React.Component {
  render() {
    return (
      <div className="tickets-content">
        <span>{localizator.translate(localizator.keys.components.tickets.loadingMessage)}</span>
      </div>
    );
  }
}
