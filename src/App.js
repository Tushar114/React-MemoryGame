import React, { Component } from 'react';
import './App.css';
import Board from './components/board';
import axios from 'axios';

class App extends Component {
  state = {
    cards: [],
    flipped: [],
    deckId: null,
    highScore: 0,
  };

  componentDidMount() {
    this.initializeDeck();
  }

  handleClick = (id) => {
    this.setState({ flipped: id });
  };

  shuffleClick = () => {
    axios
      .get(`https://deckofcardsapi.com/api/deck/${this.state.deckId}/shuffle/`)
      .then((res) => {
        this.setState({ deckId: res.data.deck_id });
        this.showCard(this.state.deckId);
      })
      .catch((err) => console.log(err));
  };

  initializeDeck = () => {
    axios
      .get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=2')
      .then((res) => {
        console.log(res);

        this.setState({ deckId: res.data.deck_id });
        this.showCard(this.state.deckId);
      });
  };

  showCard = (deckId) => {
    axios
      .get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`)
      .then((res) => this.setState({ cards: res.data.cards }))
      .catch((err) => console.log(err));
  };

  resetHighScore = () => {
    this.setState({ highScore: 0 });
  };

  render() {
    return (
      <div>
        <h2>Card Memory Game</h2>
        <button onClick={this.shuffleClick}>Play/Shuffle</button>
        <button onClick={this.resetHighScore}>Reset high score</button>
        {this.state.cards && (
          <Board
            cards={this.state.cards}
            flipped={this.state.flipped}
            handleClick={this.handleClick}
          />
        )}
      </div>
    );
  }
}

export default App;
