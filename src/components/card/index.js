import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Card = ({
  handleClick,
  value,
  backImage,
  flipped,
  frontImage,
  height,
  width,
}) => {
  return (
    <div
      className={`flip-container ${flipped ? 'flipped' : ''}`}
      style={{ width, height }}
      onClick={() => handleClick(value)}
    >
      <div className="flipper">
        <img
          style={{ width, height }}
          className={flipped ? 'front' : 'back'}
          src={flipped ? frontImage : backImage}
        />
      </div>
    </div>
  );
};

export default Card;
