import React from 'react';

import ReactModal from 'react-modal';
ReactModal.setAppElement('#root');

import localizator from 'localization/localizator';

export default class ConfirmModal extends React.Component {
  render() {
    return (
      <ReactModal
        style={this._getModalStyles()}
        shouldCloseOnOverlayClick={false}
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

  // react modal styles
  _getModalStyles() {
    let styles = {
      content: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        maxWidth: '400px',
        maxHeight: '500px',
        position: 'relative',
        top: '50%',
        transform: 'translateY(-50%)',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column'
      }
    };

    return styles;
  }

  // onClick
  _onConfirmModalClose(callback) {
    this.props.onConfirmModalClose(callback);
  }
}
