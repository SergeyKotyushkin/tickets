import React from 'react';

import ReactModal from 'react-modal';
ReactModal.setAppElement('#root');

import localizator from 'localization/localizator';

import modalTypes from 'constants/modal-types';

export default class ConfirmModal extends React.Component {
  render() {
    return (
      <ReactModal
        className={'modal-content ' + this._getModalClass()}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        isOpen={this.props.isConfirmModalOpen}
        onRequestClose={this.props.onConfirmModalClose}>
        <div className="confirm-modal-container flex-container-column">
          <div className="confirm-modal-header-container">
            <h3>{this.props.header}</h3>
          </div>
          <div className="confirm-modal-header-container">
            <p>{this.props.message}</p>
          </div>
          <div className="confirm-modal-buttons-container flex-container-row">
            <button
              onClick={this._onConfirmModalClose.bind(this, this.props.onYesCallback)}>{
                localizator.translate(
                  localizator.keys.components.app.confirmModal.yesButtonLabel
                )
              }</button>
            <button onClick={this._onConfirmModalClose.bind(this, this.props.onNoCallback)}>{
                localizator.translate(
                  localizator.keys.components.app.confirmModal.noButtonLabel
                )
              }</button>
          </div>
        </div>
      </ReactModal>
    );
  }

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

  // onClick
  _onConfirmModalClose(callback) {
    this.props.onConfirmModalClose(callback);
  }
}
