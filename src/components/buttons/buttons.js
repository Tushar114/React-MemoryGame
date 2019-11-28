import React from 'react';

require('./buttons.css');

const Buttons = (props) => {
  const { gameStarted, loadFreshDeck } = props;

  return (
    <div className="button-container">
      <button className="play-button" onClick={loadFreshDeck}>
        Play
      </button>

      <button
        style={{ display: gameStarted ? 'block' : 'none' }}
        className="reset-button"
      >
        Reset High Score
      </button>
    </div>
  );
};

export default Buttons;
