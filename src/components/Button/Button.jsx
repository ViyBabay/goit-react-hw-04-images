import React from 'react';
import PropTypes from 'prop-types';
import style from './Button.module.css';

export const Button = ({ onClick, isLoading }) => {
  return (
    <button
      type="button"
      className={style.Button}
      onClick={() => onClick()} disabled={isLoading}
    >
      Load more...
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};
