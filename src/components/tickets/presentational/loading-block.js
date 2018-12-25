import React from 'react';

import {withI18n} from "react-i18next";
import Localizator from 'localization/localizator';

class LoadingBlock extends React.Component {
  render() {
    const {t} = this.props;

    return (
      <div className="tickets-content">
        <span>{t(Localizator.keys.components.tickets.loadingMessage)}</span>
      </div>
    );
  }
}

export default withI18n()(LoadingBlock);
