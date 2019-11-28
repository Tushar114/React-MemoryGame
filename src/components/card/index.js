import React from 'react';

require('./style.css');

const Card = (props) => {
  const { value, onClick } = props;

  return (
    <div
      className={
        value.isMatched
          ? 'card-matched'
          : value.isVisible
          ? value.isVisible
            ? 'card-visible'
            : 'card-wrong'
          : 'card-container-blank'
      }
      onClick={onClick}
    >
      <img src={value.image} />
    </div>
  );
};

export default Card;
