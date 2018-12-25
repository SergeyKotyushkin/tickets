import React from 'react';

import DelimiterBlock from './delimiter-block';

import {withI18n} from "react-i18next";
import Localizator from 'localization/localizator';

class LoadMoreBlock extends React.Component {
  render() {
    const {t} = this.props;

    return this.props.isLoadMoreButtonVisible
      ? (
        <div className="tickets-load-more-container flex-container-column">
          <DelimiterBlock/>
          <div className="tickets-load-more-button-container">
            <button onClick={this.props.onLoadMoreClick}>{t(Localizator.keys.components.tickets.loadMoreButtonLabel)}</button>
          </div>
        </div>
      )
      : <React.Fragment/>;
  }
}

export default withI18n()(LoadMoreBlock);
