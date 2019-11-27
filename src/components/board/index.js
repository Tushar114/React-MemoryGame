import React from 'react';
import Card from '../card';

const Board = ({ cards, flipped, handleClick }) => {
  return (
    <div className="board">
      {cards.map((card) => {
        <Card
          key={card.code}
          value={card.value}
          width={100}
          height={100}
          frontImage={'./logo192.png'}
          backiImage={card.image}
          flipped={flipped.includes(card.id)}
          handleClick={() => handleClick(card.id)}
        />;
      })}
    </div>
  );
};

export default Board;
