import { useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './Modal.module.css';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');
export const Modal = ({ closeModal, largePhotoURL, tags }) => {
  useEffect(() => {
    const handleKeyDown = evt => {
      if (evt.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  const handleOnBackDropClick = evt => {
    if (evt.currentTarget === evt.target) {
      closeModal();
    }
  };

  return createPortal(
    <div className={style.Overlay} onClick={handleOnBackDropClick}>
      <div className={style.Modal}>
        <img src={largePhotoURL} alt={tags} />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  largeImgURL: PropTypes.string,
};
