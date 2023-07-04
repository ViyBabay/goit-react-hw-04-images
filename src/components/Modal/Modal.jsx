import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import style from './Modal.module.css';

export class Modal extends Component {

  componentDidMount() {
    window.addEventListener('keydown', this.handelKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handelKeyDown);
  }

  handelKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.props.closeModal();
    }
  };
  handleOnBackDropClick = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.closeModal();
    }
  };

  render() {
    return (
      <div className={style.Overlay} onClick={this.handleOnBackDropClick}>
        <div className={style.Modal}>
          <img src={this.props.largePhotoURL} alt={this.props.tags} />
        </div>
      </div>
    );
  }
}

// Modal.propTypes = {
//   closeModal: PropTypes.func.isRequired,
//   largeImgURL: PropTypes.string.isRequired,
// };
