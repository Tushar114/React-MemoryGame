import React from 'react';

require('./turns.css');

const Turns = (props) => {
  const { moves, gameStarted } = props;

  return (
    <div
      className="move-container"
      style={{ display: gameStarted ? 'flex' : 'none' }}
    >
      <div> Turns Taken : </div>
      <div className="moves"> {moves} </div>
    </div>
  );
};

export default Turns;
