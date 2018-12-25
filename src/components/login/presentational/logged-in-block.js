import React from 'react';

import {withI18n} from "react-i18next";
import Localizator from 'localization/localizator';

class LoggedInBlock extends React.Component {
  render() {
    const {t} = this.props;

    return (
      <div className="login-title-container">
        <h2>{this.props.username}{t(Localizator.keys.components.login.loggedIn.messagePart2)}</h2>
      </div>
    );
  }
}

export default withI18n()(LoggedInBlock);
