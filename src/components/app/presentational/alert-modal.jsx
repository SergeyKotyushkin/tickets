import React from 'react';

import ReactModal from 'react-modal';
ReactModal.setAppElement('#root');

import localizator from 'localization/localizator';

import modalTypes from 'constants/modal-types';

export default class AlertModal extends React.Component {
  render() {
    return (
      <ReactModal
        className={'modal-content ' + this._getModalClass()}
        isOpen={this.props.isAlertModalOpen}
        onRequestClose={this.props.onAlertModalClose}>
        <div className="alert-modal-container flex-container-column">
          <div className="alert-modal-header-container">
            <h3>{this.props.header}</h3>
          </div>
          <div className="alert-modal-header-container">
            <p>{this.props.message}</p>
          </div>
          <div className="alert-modal-buttons-container flex-container-row">
            <button onClick={this.props.onAlertModalClose}>{
                localizator.translate(
                  localizator.keys.components.app.alertModal.closeButtonLabel
                )
              }</button>
          </div>
        </div>
      </ReactModal>
    );
  }

  // react modal styles
  _getModalClass() {
    switch (this.props.modalType) {
      case modalTypes.success:
        return 'modal-content-success';
      case modalTypes.attention:
        return 'modal-content-attention';
      case modalTypes.error:
        return 'modal-content-error';
      default:
        return '';
    }
  }
}
