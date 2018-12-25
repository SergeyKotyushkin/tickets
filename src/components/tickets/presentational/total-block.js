import React from 'react'

import DelimiterBlock from './delimiter-block';

import {withI18n} from "react-i18next";
import Localizator from 'localization/localizator';

class TotalBlock extends React.Component {
  render() {
    const {t} = this.props;

    return (
      <div className="tickets-total-container flex-container-column">
        <DelimiterBlock/>
        <div className="tickets-total-text-container">
          <div>
            <span className="tickets-total-label">{t(Localizator.keys.components.tickets.totalLabel)}</span>
            <span>{this.props.total}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withI18n()(TotalBlock);
