import React from 'react';

import ReactModal from 'react-modal';
ReactModal.setAppElement('#root');

import localizator from 'localization/localizator';

export default class AlertModal extends React.Component {
  render() {
    return (
      <ReactModal
        style={this._getModalStyles()}
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
}
